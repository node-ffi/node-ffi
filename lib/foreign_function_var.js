
var ffi = require('./ffi')
  , _ForeignFunction = require('./_foreign_function')
  , assert = require('assert')
  , debug = require('debug')('ffi:ForeignFunction')
  , ref = require('ref')
  , bindings = require('./bindings')
  , POINTER_SIZE = ref.sizeof.pointer
  , FFI_ARG_SIZE = bindings.FFI_ARG_SIZE

/**
 * For when you want to call to a C function with variable amount of arguments.
 * i.e. `printf()`.
 */

function VariadicForeignFunction (funcPtr, returnType, fixedArgTypes, abi) {
  debug('creating new VariadicForeignFunction', funcPtr)

  // check args
  assert(Buffer.isBuffer(funcPtr), 'expected Buffer as first argument')
  assert(!!returnType, 'expected a return "type" object as the second argument')
  assert(Array.isArray(fixedArgTypes), 'expected Array of arg "type" objects as the third argument')

  var numFixedArgs = fixedArgTypes.length

  // normalize the "types" (they could be strings,
  // so turn into real type instances)
  returnType = ref.coerceType(returnType)
  fixedArgTypes = fixedArgTypes.map(ref.coerceType)

  // "result" must point to storage that is sizeof(long) or larger. For smaller
  // return value sizes, the ffi_arg or ffi_sarg integral type must be used to
  // hold the return value
  var resultSize = returnType.size >= ref.sizeof.long ? returnType.size : FFI_ARG_SIZE
  assert(resultSize > 0)


  // what gets returned is another function that needs to be invoked with the rest
  // of the variadic types that are being invoked from the function.
  return function () {

    // first get the types of variadic args we are working with
    var varargTypes = []
    for (var i = 0; i < arguments.length; i++) {
      var type = ref.coerceType(arguments[i])
      varargTypes.push(type)
    }

    // get an array of *all* the argument types
    var argTypes = fixedArgTypes.concat(varargTypes)

    // create the `ffi_cif *` instance
    // TODO: caching here of the returned proxy function
    var cif = ffi.CIF_var(returnType, argTypes, numFixedArgs, abi)
    return _ForeignFunction(cif, funcPtr, returnType, argTypes)
  }
}

module.exports = VariadicForeignFunction
