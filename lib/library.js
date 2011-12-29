var FFI = require("./ffi");

// Provides a friendly abstraction/API on-top of DynamicLibrary and ForeignFunction
function Library (libfile, funcs) {
    var dl = new FFI.DynamicLibrary(
        libfile == null ? null : libfile + FFI.PLATFORM_LIBRARY_EXTENSIONS[process.platform],
        FFI.DynamicLibrary.FLAGS.RTLD_NOW
    )

    for (var k in funcs) {
        var fptr = dl.get(k)
          , info = funcs[k]

        if (fptr.isNull()) {
          throw new Error('DynamicLibrary "'+libfile+'" returned NULL function pointer for "'+k+'"')
        }

        var resultType = info[0]
          , paramTypes = info[1]
          , fopts = info[2]
          , async = fopts ? fopts.async : false

        this[k] = FFI.ForeignFunction.build(fptr, resultType, paramTypes, async)
    }
}
module.exports = Library
