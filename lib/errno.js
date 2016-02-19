var DynamicLibrary = require('./dynamic_library')
  , ForeignFunction = require('./foreign_function')
  , bindings = require('./bindings')
  , funcs = bindings.StaticFunctions
  , ref = require('ref')
  , int = ref.types.int
  , intPtr = ref.refType(int)
  , errno = null

if (process.platform == 'win32') {
  var _errno = DynamicLibrary('msvcrt.dll').get('_errno')
  var errnoPtr = ForeignFunction(_errno, intPtr, [])
  errno = function() {
    return errnoPtr().deref()
  }
} else {
  errno = ForeignFunction(funcs._errno, 'int', [])
}


module.exports = errno
