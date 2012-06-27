/**
 * The extension to use on libraries.
 * i.e.  libm  ->  libm.so   on linux
 */

var DynamicLibrary = require('./dynamic_library')
  , ForeignFunction = require('./foreign_function')
  , VariadicForeignFunction = require('./foreign_function_var')
  , debug = require('debug')('ffi:Library')
  , RTLD_NOW = DynamicLibrary.FLAGS.RTLD_NOW

/**
 * The extension to use on libraries.
 * i.e.  libm  ->  libm.so   on linux
 */

Object.defineProperty(exports, 'LIB_EXT', {
    configurable: true
  , enumerable: true
  , writable: false
  , value: {
        'linux':  '.so'
      , 'linux2': '.so'
      , 'sunos':  '.so'
      , 'solaris':'.so'
      , 'darwin': '.dylib'
      , 'mac':    '.dylib'
      , 'win32':  '.dll'
    }[process.platform]
})

/**
 * Provides a friendly abstraction/API on-top of DynamicLibrary and
 * ForeignFunction.
 */

exports.Library = function Library (libfile, funcs) {
  debug('creating Library object for', libfile)

  if (libfile && libfile.indexOf(exports.LIB_EXT) === -1) {
    debug('appending library extension to library name', exports.LIB_EXT)
    libfile += exports.LIB_EXT
  }

  var lib = {}
  var dl = new DynamicLibrary(libfile || null, RTLD_NOW)

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
      lib[func] = VariadicForeignFunction(fptr, resultType, paramTypes, abi)
    } else {
      var ff = ForeignFunction(fptr, resultType, paramTypes, abi)
      lib[func] = async ? ff.async : ff
    }
  })

  return lib
}
