
var ffi = require('./ffi')
  , assert = require('assert')
  , debug = require('debug')('ffi:ForeignFunction')
  , ref = require('ref')
  , EventEmitter = require('events').EventEmitter
  , POINTER_SIZE = ref.sizeof.pointer
  , FFI_ARG_SIZE = ffi.Bindings.FFI_ARG_SIZE

/**
 * Represents a foreign function in another library. Manages all of the aspects
 * of function execution, including marshalling the data parameters for the
 * function into native types and also unmarshalling the return from function
 * execution.
 */

function ForeignFunction (func, returnType, argTypes, abi) {
  debug('creating new ForeignFunction', func)

  // check args
  assert(Buffer.isBuffer(func), 'expected Buffer as first argument')
  assert(!!returnType, 'expected a return "type" object as the second argument')
  assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the third argument')

  // "result" must point to storage that is sizeof(long) or larger. For smaller
  // return value sizes, the ffi_arg or ffi_sarg integral type must be used to
  // hold the return value
  var resultSize = returnType.size >= ref.sizeof.long ? returnType.size : FFI_ARG_SIZE

  // the array of `ffi_type *` instances for the argument types
  var numArgs = argTypes.length
    , argsArraySize = numArgs * POINTER_SIZE

  // normalize the "types" (they could be strings, so turn into real type
  // instances)
  returnType = ffi.coerceType(returnType)
  argTypes = argTypes.map(ffi.coerceType)

  // create the `ffi_cif *` instance
  var cif = ffi.CIF(returnType, argTypes, abi)

  /**
   * This is the actual JS function that gets returned.
   * It handles marshalling input arguments into C values,
   * and unmarshalling the return value back into a JS value
   */

  var proxy = function () {
    debug('invoking proxy function', returnType, argTypes)

    if (arguments.length !== numArgs) {
      throw new TypeError('Expected ' + numArgs +
          ' arguments, got ' + arguments.length)
    }

    // storage buffers for input arguments and the return value
    var result = new Buffer(resultSize)
      , argsList = new Buffer(argsArraySize)

    // write arguments to storage areas
    for (var i = 0; i < numArgs; i++) {
      var argType = argTypes[i]
        , val = arguments[i]

      var valPtr = ref.alloc(argType, val)
      argsList.writePointer(valPtr, i * POINTER_SIZE)
    }

    // invoke the `ffi_call()` function
    ffi.Bindings.ffi_call(cif, func, result, argsList)

    result.type = returnType
    return ref.deref(result)
  }

  /**
   * The asynchronous version of the proxy function.
   */

  proxy.async = function () {
    debug('invoking async proxy function', returnType, argTypes)

    var argc = arguments.length
    if (argc !== numArgs + 1) {
      throw new TypeError('Expected ' + (numArgs + 1) +
          ' arguments, got ' + argc)
    }

    var callback = arguments[argc - 1]
    if (typeof callback !== 'function') {
      throw new TypeError('Expected a callback function as argument number: ' +
          (argc - 1))
    }

    // storage buffers for input arguments and the return value
    var result = new Buffer(resultSize)
      , argsList = new Buffer(argsArraySize)

    result.type = returnType

    // write arguments to storage areas
    for (var i = 0; i < numArgs; i++) {
      var argType = argTypes[i]
        , val = arguments[i]

      var valPtr = ref.alloc(argType, val)
      argsList.writePointer(valPtr, i * POINTER_SIZE)
    }

    // invoke the `ffi_call()` function asynchronously
    ffi.Bindings.ffi_call_async(cif, func, result, argsList, function (err) {
      if (err) {
        callback(err)
      } else {
        callback(null, ref.deref(result))
      }
    })
  }

  return proxy
}
module.exports = ForeignFunction
