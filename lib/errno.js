// Implementation of errno. This is a #define :/. On Linux, it's a global variable with the symbol
// "errno", but on OS X it's a method execution called __error.

var FFI = require("./ffi");

if (process.platform == "darwin") {
    var darwinErrorMethod = FFI.ForeignFunction.build(
        new FFI.DynamicLibrary().get("__error"),
        "pointer",
        []
    );
}
else {
    var errnoGlobal = new FFI.DynamicLibrary().get("errno");
}

var errno = module.exports = function() {
    if (process.platform == "darwin") {
        return FFI.derefValuePtr("int32", darwinErrorMethod());
    }
    else {
        return errnoGlobal.getInt32();
    }
};
