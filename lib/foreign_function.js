var FFI     = require("./ffi"),
    events  = require("events"),
    util    = require("util");

// Represents a foreign function in another library. Manages all of the aspects of function
// execution, including marshalling the data parameters for the function into native types
// and also unmarshalling the return from function execution.
var ForeignFunction = module.exports = function(ptr, returnType, types, async) {
    this._returnType    = returnType;
    this._types         = types;
    this._fptr          = ptr;
    this._async         = async;
    
    // allocate storage areas
    this._resultPtr     = new FFI.Pointer(FFI.sizeOf(this._returnType));    
    this._paramPtrs     = [];
    this._strParamPtrs  = {};

    this._arglistPtr    = new FFI.Pointer(types.length * FFI.Bindings.POINTER_SIZE);
    
    var cptr = this._arglistPtr.seek(0);
    
    // allocate a storage area for each argument, then write the pointer to the argument list
    for (var i = 0, len = types.length; i < len; i++) {
        var pptr = new FFI.Pointer(FFI.sizeOf(types[i]));
        
        cptr.putPointer(pptr, true);
        this._paramPtrs.push(pptr);
        
        if (types[i] == "string") {
            this._strParamPtrs[i] = new FFI.Pointer(FFI.STRING_ARGUMENT_BUFFER_SIZE);
            pptr.putPointer(this._strParamPtrs[i]);
        }
    }
    
    this._cif = new FFI.CIF(returnType, types);
    this._initializeProxy();
};

ForeignFunction.prototype._initializeProxy = function() {
    var self        = this;
    var cifptr      = this._cif.getPointer();
    
    this._proxy = function() {
        var async   = self._async;
        var ptr     = self._cif.getPointer();
        
        if (arguments.length != self._types.length)
            throw new Error("Function arguments did not meet specification.");
        
        // write arguments to storage areas
        for (var i = 0, len = arguments.length; i < len; i++) {
            var t = self._types[i];
            var v = arguments[i];
            
            if (v == null) {
                self._paramPtrs[i].putPointer(FFI.Pointer.NULL);
            }
            else {
                if (t == "string") {
                    // if it's a string, we have to write it to our secondary buffers    

                    // if our incoming string is larger than our allocation area, increase
                    // the size of our allocation area
                    if ((v.length + 1) > self._strParamPtrs[i].allocated) {
                        var newptr = new FFI.Pointer(v.length + 1);
                        self._strParamPtrs[i] = newptr;
                        self._paramPtrs[i].putPointer(newptr);
                    }
            
                    self._strParamPtrs[i].putCString(v);
                    self._paramPtrs[i].putPointer(self._strParamPtrs[i]);    
                }
                else if (FFI.isStructType(t)) {
                    // wrap any non-struct-instances with a struct instance
                    var what = ("__isStructInstance__" in v) ? v : new t(v);
                    self._paramPtrs[i].putPointer(what);
                }
                else {
                    FFI.Pointer.putDispatchTable[t].apply(self._paramPtrs[i], [v]);
                }
            }
        }
        
        var r = FFI.Bindings.call(cifptr, self._fptr, self._arglistPtr, self._resultPtr, async);
        
        if (async) {
            var emitter = new events.EventEmitter();
            
            r.on("success", function() {
                emitter.emit("success", FFI.derefValuePtr(self._returnType, self._resultPtr));
            });
            
            return emitter;
        }
        
        return FFI.derefValuePtr(self._returnType, self._resultPtr);
    };
};

// Returns a JavaScript Function proxy for this foreign function.
ForeignFunction.prototype.getFunction = function() {
    return this._proxy;
};

ForeignFunction.build = function(ptr, returnType, types, async) {
    var ff = new ForeignFunction(ptr, returnType, types, async);
    return ff.getFunction();
};
