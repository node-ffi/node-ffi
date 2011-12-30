
/**
 * Implementation of errno. This is a #define :/
 * On Linux, it's a global variable with the symbol `errno`,
 * but on Darwin it's a method execution called `__error`.
 */

var ffi = require('./ffi')
  , errnoPtr = null

if (process.platform == 'darwin') {
  var __error = new ffi.DynamicLibrary().get('__error')
  errnoPtr = ffi.ForeignFunction(__error, 'pointer', [])
} else {
  var errnoGlobal = new ffi.DynamicLibrary().get('errno');
  errnoPtr = function () { return errnoGlobal }
}

function errno () {
  return errnoPtr().getInt32()
}
module.exports = errno
