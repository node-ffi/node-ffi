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
    this._strParamPtrs  = {};
    this._argputf       = [];
    this._arglistPtr    = new FFI.Pointer(types.length * FFI.Bindings.POINTER_SIZE);

    // allocate a storage area for each argument, then write the pointer to the argument list
    types.forEach(function (type, i) {
        var argPtr = this._arglistPtr.seek(i * FFI.Bindings.POINTER_SIZE);

        if (FFI.isStructType(type)) {
          return this._argputf[i] = function (val) {
            argPtr.putPointer(val.ref());
          }
        }

        var valPtr = new FFI.Pointer(FFI.sizeOf(type));
        argPtr.putPointer(valPtr);

        if (type == 'string') {
           return this._argputf[i] = function (val) {
             if (typeof val == 'undefined' || val === null) return valPtr.putPointer(FFI.Pointer.NULL);
             var len = Buffer.byteLength(val, 'utf8');
             var strPtr = new FFI.Pointer(len+1);
             strPtr.putCString(val);
             valPtr.putPointer(strPtr);
           }
        }

        if (type == "pointer") {
          // Bypass the struct check for non-struct types
          return this._argputf[i] = function (val) {
            valPtr._putPointer(val);
          }
        } else {
          var putCallRef = FFI.Pointer.putDispatchTable[type];
          return this._argputf[i] = function (val) {
             putCallRef.call(valPtr, val);
          }
        }
    }, this);

    this._cif = new FFI.CIF(returnType, types);
    this._initializeProxy();
};

ForeignFunction.prototype._initializeProxy = function() {
    var self        = this;

    // cache these for a bit quicker calls
    var stlen       = this._types.length;
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
