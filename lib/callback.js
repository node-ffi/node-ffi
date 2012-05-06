
var ffi = require('./ffi')
  , assert = require('assert')
  , ref = require('ref')
  , debug = require('debug')('ffi:Callback')
  , POINTER_SIZE = ref.sizeof.pointer

/**
 * Turns a JavaScript function into a C function pointer.
 * The function pointer may be used in other C functions that
 * accept C callback functions.
 */

function Callback (retType, types, abi, func) {
  debug('creating new Callback')

  if (typeof abi === 'function') {
    func = abi
    abi = undefined
  }

  // check args
  assert(!!retType, 'expected a return "type" object as the first argument')
  assert(Array.isArray(types), 'expected Array of arg "type" objects as the second argument')
  assert.equal(typeof func, 'function', 'expected a function as the third argument')

  // normalize the "types" (they could be strings, so turn into real type
  // instances)
  retType = ffi.coerceType(retType)
  types = types.map(function (argType) {
    return ffi.coerceType(argType)
  })

  // create the `ffi_cif *` instance
  var cif = ffi.CIF(retType, types, abi)
  var argv = types.length

  var _info  = new ffi.CallbackInfo(cif, function (retval, params) {
    debug('Callback function being invoked')

    var args = []
    for (var i = 0; i < argv; i++) {
      args.push(types[i].get(params, i * POINTER_SIZE))
    }

    // Invoke the user-given function
    var result = func.apply(null, args)

    retType.set(retval, result)
  })

  var closurePtr = _info.pointer
  closurePtr._info = _info
  return _info.pointer
}
module.exports = Callback
