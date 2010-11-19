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
    this._argputf       = [];
    this._arglistPtr    = new FFI.Pointer(types.length * FFI.Bindings.POINTER_SIZE);
    
    var cptr        = this._arglistPtr.seek(0);
        
    // allocate a storage area for each argument, then write the pointer to the argument list
    for (var i = 0, len = types.length; i < len; i++) {
        var pptr = new FFI.Pointer(FFI.sizeOf(types[i]));
        
        cptr.putPointer(pptr, true);
        this._paramPtrs.push(pptr);
        
        if (types[i] == "string") {
            this._strParamPtrs[i] = new FFI.Pointer(FFI.STRING_ARGUMENT_BUFFER_SIZE);
            pptr.putPointer(this._strParamPtrs[i]);
        }
        
        // Assign the writer functions for each argument
        this._argputf[i] = putterFunction(types[i], pptr, this._strParamPtrs[i]);
    }
    
    this._cif = new FFI.CIF(returnType, types);
    this._initializeProxy();
};

function putterFunction(type, pptrRef, spptrRef) {        
    if (type == "string") {
        var nullified   = false,
            nullptr     = FFI.Pointer.NULL;
        
        return function(val) {    
            // if our incoming string is larger than our allocation area, increase
            // the size of our allocation area
            if (val != null) {
                var vlen = val.length;

                if ((vlen + 1) > spptrRef.allocated) {
                    var newptr = new FFI.Pointer(vlen + 1);
                    spptrRef = newptr;
                    pptrRef.putPointer(newptr);
                }

                spptrRef.putCString(val);
                
                if (nullified) {
                    pptrRef.putPointer(spptrRef);
                    nullified = false;
                }
            }
            else {
                pptrRef.putPointer(nullptr);
                nullified = true;
            }
        }
    }
    else if (FFI.isStructType(type)) {
        // wrap any non-struct-instances with a struct instance
        return function(val) {
            var what = (val == null || "__isStructInstance__" in val) ? val : new type(val);
            pptrRef.putPointer(what);
        }
    }
    else {
        var putCallRef = FFI.Pointer.putDispatchTable[type];
        
        if (type == "pointer") {
            // Bypass the struct check for non-struct types
            return function (val) {
                pptrRef._putPointer(val);                
            }
        }
        else {
            return function (val) {
                putCallRef.call(pptrRef, val);
            }
        }
    }
}

ForeignFunction.prototype._initializeProxy = function() {
    var self        = this;
    var cifptr      = this._cif.getPointer();
    
    // cache these for a bit quicker calls
    var stlen       = this._types.length;
    var ffiCall     = FFI.Bindings.call;
    var pptrs       = this._paramPtrs;
    var drefVal     = FFI.derefValuePtrFunc(this._returnType);
    var async       = this._async;
    var aputf       = this._argputf;
    var resPtr      = this._resultPtr;
    var nullptr     = FFI.Pointer.NULL;
    
    var caller = new FFI.Bindings.ForeignCaller(
        this._cif.getPointer(), 
        this._fptr,
        this._arglistPtr, 
        this._resultPtr, 
        async
    );

    this._proxy = function() {
        var alen    = arguments.length,
            types   = self._types; // XXX: if this isn't in here, callbacks segfault. what.. the.. f?
        
        if (alen != stlen)
            throw new Error("Function arguments did not meet specification.");

        
        // write arguments to storage areas
        for (var i = 0; i < alen; i++) {
            var v = arguments[i];          
            aputf[i](arguments[i]);
        }
    
        var r = caller.exec();
        
        if (async) {
            var emitter = new events.EventEmitter();
            
            r.on("success", function() {
                emitter.emit("success", drefVal(resPtr));
            });
            
            return emitter;
        }
        
        return drefVal(resPtr);
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
