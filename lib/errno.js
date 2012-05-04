
/**
 * Implementation of errno. This is a #define :/
 * On Linux, it's a global variable with the symbol `errno`,
 * but on Darwin it's a method execution called `__error`.
 */

var ffi = require('./ffi')
  , ref = require('ref')
  , errnoPtr = null

if (process.platform == 'darwin' || process.platform == 'mac') {
  var __error = new ffi.DynamicLibrary().get('__error')
  errnoPtr = ffi.ForeignFunction(__error, 'pointer', [])
} else if (process.platform == 'win32') {
  var _errno = new ffi.DynamicLibrary('msvcrt.dll').get('_errno')
  errnoPtr = ffi.ForeignFunction(_errno, 'pointer', [])
} else {  // linux, sunos, etc.
  var errnoGlobal = new ffi.DynamicLibrary().get('errno');
  errnoPtr = function () { return errnoGlobal }
}

// set the errno type
errnoPtr.type = ref.types.int

function errno () {
  return errnoPtr().deref()
}
module.exports = errno
