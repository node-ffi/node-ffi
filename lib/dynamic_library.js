var FFI = require("./ffi");

// DynamicLibrary loads and fetches function pointers for dynamic libraries (.so, .dylib, etc)
var DynamicLibrary = module.exports = function(path, mode) {
    this._handle = this._dlopen(path, mode || DynamicLibrary.FLAGS.RTLD_NOW);

    if (this._handle.isNull()) {
        throw new Error("Dynamic Linking Error: " + this._dlerror());
    }
};

DynamicLibrary.FLAGS = {
    "RTLD_LAZY":    0x1,
    "RTLD_NOW":     0x2,
    "RTLD_LOCAL":   0x4,
    "RTLD_GLOBAL":  0x8
};

// Close this library, returns the result of the dlclose() system function
DynamicLibrary.prototype.close = function() {
    return this._dlclose(this._handle);
};

// Get a symbol from this library, returns a Pointer for (memory address of) the symbol
DynamicLibrary.prototype.get = function(symbol) {
    var ptr;

    if ((ptr = this._dlsym(this._handle, symbol)).isNull()) {
        throw new Error("Dynamic Symbol Retrieval Error: " + this.error());
    }

    return ptr;
};

// Returns the result of the dlerror() system function
DynamicLibrary.prototype.error = function() {
    return this._dlerror();
};


DynamicLibrary.prototype._dlopen = FFI.ForeignFunction.build(
    FFI.Bindings.StaticFunctions.dlopen,
    "pointer",
    [ "string", "int32" ]
);

DynamicLibrary.prototype._dlclose = FFI.ForeignFunction.build(
    FFI.Bindings.StaticFunctions.dlclose,
    "int32",
    [ "pointer" ]
);

DynamicLibrary.prototype._dlsym = FFI.ForeignFunction.build(
    FFI.Bindings.StaticFunctions.dlsym,
    "pointer",
    [ "pointer", "string" ]
);

DynamicLibrary.prototype._dlerror = FFI.ForeignFunction.build(
    FFI.Bindings.StaticFunctions.dlerror,
    "string",
    [ ]
);
