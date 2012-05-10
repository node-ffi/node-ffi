
/**
 * Implementation of errno. This is a #define :/
 * On Linux, it's a global variable with the symbol `errno`,
 * On Darwin it's a method execution called `__error`.
 * On Windows it's a method execution called `_errno`.
 */

var ffi = require('./ffi')
  , ref = require('ref')
  , errnoPtr = null
  , int = ref.types.int
  , intPtr = ref.refType(int)

if (process.platform == 'darwin' || process.platform == 'mac') {
  var __error = ffi.DynamicLibrary().get('__error')
  errnoPtr = ffi.ForeignFunction(__error, intPtr, [])
} else if (process.platform == 'win32') {
  var _errno = ffi.DynamicLibrary('msvcrt.dll').get('_errno')
  errnoPtr = ffi.ForeignFunction(_errno, intPtr, [])
} else {  // linux, sunos, etc.
  var errnoGlobal = ffi.DynamicLibrary().get('errno').reinterpret(int.size)
  errnoPtr = function () { return errnoGlobal }
  // set the errno type
  errnoGlobal.type = int
}


function errno () {
  return errnoPtr().deref()
}
module.exports = errno
