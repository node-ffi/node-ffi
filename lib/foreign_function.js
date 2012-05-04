
var ffi = require('./ffi')
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

  // "result" must point to storage that is sizeof(long) or larger. For smaller
  // return value sizes, the ffi_arg or ffi_sarg integral type must be used to
  // hold the return value
  var resultSize = returnType.size >= ref.sizeof.long ? returnType.size : FFI_ARG_SIZE

  // the array of `ffi_type *` instances for the argument types
  var numArgs = argTypes.length
    , argsArraySize = numArgs * POINTER_SIZE

  // create the `ffi_cif *` instance
  var cif = ffi.CIF(returnType, argTypes)

  /**
   * This is the actual JS function that gets returned.
   * It handles marshalling input arguments into C values,
   * and unmarshalling the return value back into a JS value
   */

  var proxy = function () {
    if (arguments.length !== numArgs) {
      throw new TypeError('Expected ' + numArgs + ' arguments, got ' + arguments.length)
    }

    // storage buffers for input arguments and the return value
    var result = new Buffer(resultSize)
      , argsList = new Buffer(argsArraySize)

    // write arguments to storage areas
    for (var i = 0; i < numArgs; i++) {
      var argType = argTypes[i]
        , val = arguments[i]
        , valPrt

      console.error(i, argType, val)
      if (val && val.pointer) {
        // struct type, etc.
        valPtr = val.pointer
      } else {
        // regular types; char, short, int, float, double, etc.
        valPtr = ref.alloc(argType, val)
      }
      argsList.writePointer(valPtr, i * POINTER_SIZE)
    }

    console.error('before ffi_call()')
    ffi.Bindings.ffi_call(cif, func, result, argsList)
    console.error('after ffi_call()')

    /*if (async) {
      throw new Error('implement async!')
      var emitter = new EventEmitter()
      r.on('success', function () {
        emitter.emit('success', drefVal(result))
      })
      return emitter
    }*/

    result.type = returnType
    return ref.deref(result)
  }

  return proxy
}
module.exports = ForeignFunction
