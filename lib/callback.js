
/**
 * Module dependencies.
 */

var CIF = require('./cif')
  , assert = require('assert')
  , ref = require('ref')
  , debug = require('debug')('ffi:Callback')
  , _Callback = require('./bindings').Callback
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
    abi = void(0)
  }

  // check args
  assert(!!retType, 'expected a return "type" object as the first argument')
  assert(Array.isArray(types), 'expected Array of arg "type" objects as the second argument')
  assert.equal(typeof func, 'function', 'expected a function as the third argument')

  // normalize the "types" (they could be strings, so turn into real type
  // instances)
  retType = ref.coerceType(retType)
  types = types.map(ref.coerceType)

  // create the `ffi_cif *` instance
  var cif = CIF(retType, types, abi)
  var argc = types.length

  return _Callback(cif, retType.size, argc, function (retval, params) {
    debug('Callback function being invoked')

    var args = []
    for (var i = 0; i < argc; i++) {
      var type = types[i]
      var argPtr = params.readPointer(i * POINTER_SIZE, type.size)
      argPtr.type = type
      args.push(argPtr.deref())
    }

    // Invoke the user-given function
    var result = func.apply(null, args)
    //console.error('retval:', retval)
    //console.error('result:', result)

    retType.set(retval, 0, result)
  })
}
module.exports = Callback
