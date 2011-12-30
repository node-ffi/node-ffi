var ffi = require("./ffi");

// Provides a friendly abstraction/API on-top of DynamicLibrary and ForeignFunction
function Library (libfile, funcs) {
    var dl = new ffi.DynamicLibrary(
        libfile == null ? null : libfile + ffi.PLATFORM_LIBRARY_EXTENSIONS[process.platform],
        ffi.DynamicLibrary.FLAGS.RTLD_NOW
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

        this[k] = ffi.ForeignFunction.build(fptr, resultType, paramTypes, async)
    }
}
module.exports = Library
