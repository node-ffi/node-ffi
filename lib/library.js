var FFI = require("./ffi");

// Provides a friendly abstraction/API on-top of DynamicLibrary and ForeignFunction
var Library = module.exports = function (libfile, funcs) {
    var dl = new FFI.DynamicLibrary(
        libfile == null ? null : libfile + FFI.PLATFORM_LIBRARY_EXTENSIONS[process.platform],
        FFI.DynamicLibrary.FLAGS.RTLD_NOW
    );

    for (var k in funcs) {
        var fptr = dl.get(k);

        if (fptr.isNull()) {
          throw new Error('DynamicLibrary "'+libfile+'" returned NULL function pointer for "'+k+'"');
        }

        var resultType  = funcs[k][0],
            paramTypes  = funcs[k][1],
            fopts       = funcs[k][2];

        this[k] = FFI.ForeignFunction.build(fptr, resultType, paramTypes, fopts ? fopts.async : undefined);
    }
};
