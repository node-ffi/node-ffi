// Implementation of errno. This is a #define :/. On Linux, it's a global variable with the symbol
// "errno", but on OS X it's a method execution called __error.

var FFI = require('./ffi')
  , errnoPtr = null

if (process.platform == 'darwin') {
  var __error = new FFI.DynamicLibrary().get('__error')
  errnoPtr = FFI.ForeignFunction.build(__error, 'pointer', [])
} else {
  var errnoGlobal = new FFI.DynamicLibrary().get('errno');
  errnoPtr = function () { return errnoGlobal }
}

function errno () {
  return errnoPtr().getInt32()
}
module.exports = errno
