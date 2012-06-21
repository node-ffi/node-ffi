
var ffi = require('./ffi')
  , debug = require('debug')('ffi:Library')
  , EXT = ffi.LIB_EXT
  , RTLD_NOW = ffi.DynamicLibrary.FLAGS.RTLD_NOW

/**
 * Provides a friendly abstraction/API on-top of DynamicLibrary and
 * ForeignFunction.
 */

function Library (libfile, opts, funcs) {
  debug('creating Library object for', libfile)

  if (libfile && libfile.indexOf(EXT) === -1) {
    debug('appending library extension to library name', EXT)
    libfile += EXT
  }

  if (!funcs) {
    funcs = opts;
    opts = {};
  }

  var lib = {}
  var dl = new ffi.DynamicLibrary(libfile || null, opts, RTLD_NOW)

  Object.keys(funcs || {}).forEach(function (func) {
    debug('defining function', func)

    var fptr = dl.get(func)
      , info = funcs[func]

    if (fptr.isNull()) {
      throw new Error('Library: "' + libfile
        + '" returned NULL function pointer for "' + func + '"')
    }

    var resultType = info[0]
      , paramTypes = info[1]
      , fopts = info[2]
      , abi = fopts && fopts.abi
      , async = fopts && fopts.async
      , varargs = fopts && fopts.varargs

    if (varargs) {
      lib[func] = ffi.VariadicForeignFunction(fptr, resultType, paramTypes, abi)
    } else {
      var ff = ffi.ForeignFunction(fptr, resultType, paramTypes, abi)
      lib[func] = async ? ff.async : ff
    }
  })

  return lib
}
module.exports = Library
