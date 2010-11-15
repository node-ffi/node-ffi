var FFI     = require("./ffi"),
    util    = require("util");

// CIF proves a JS interface for the libffi "callback info" (CIF) structure
var CIF = module.exports = function(rtype, types) {
    this._returnType    = rtype;
    this._types         = types;
    
    if (!FFI.isValidReturnType(this._returnType)) {
        throw new Error("Invalid Return Type");
    }
    
    this._argtypesptr   = new FFI.Pointer(types.length * FFI.Bindings.FFI_TYPE_SIZE);
    this._rtypeptr      = FFI.Bindings.FFI_TYPES[this._returnType];
    
    var tptr = this._argtypesptr.seek(0);
    
    for (var i = 0, len = types.length; i < len; i++) {
        var typeName = types[i];
        
        if (FFI.isValidParamType(typeName)) {
            tptr.putPointer(FFI.ffiTypeFor(typeName), true);
        }
        else {
            throw new Error("Invalid Type: " + types[i]);
        }
    }
    
    this._cifptr = FFI.Bindings.prepCif(types.length, this._rtypeptr, this._argtypesptr);    
};

CIF.prototype.getArgTypesPointer    = function() { return this._argtypesptr; }
CIF.prototype.getReturnTypePointer  = function() { return this._rtypeptr; }
CIF.prototype.getPointer            = function() { return this._cifptr; }
