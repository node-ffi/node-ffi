
var ffi = require('./ffi')
  , ref = require('ref')
  , debug = require('debug')('ffi:Callback')
  , POINTER_SIZE = ref.sizeof.pointer

/**
 * Turns a JavaScript function into a C function pointer.
 * The function pointer may be used in other C functions that
 * accept C callback functions.
 * TODO: Deprecate this class, make this function return the callback pointer
 *       directly.
 */

function Callback (retType, types, func) {
  debug('creating new Callback', retType, types, func)

  var cif = ffi.CIF(retType, types)
  var argv = types.length

  this._info  = new ffi.CallbackInfo(cif, function (retval, params) {
    debug('Callback function being invoked')

    var args = []
    for (var i = 0; i < argv; i++) {
      args.push(types[i].get(params, i * POINTER_SIZE))
    }

    // Invoke the user-given function
    var result = func.apply(null, args)

    retType.set(retval, result)
  })

  this.pointer = this._info.pointer
}
module.exports = Callback
