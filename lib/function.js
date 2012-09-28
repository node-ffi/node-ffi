
/**
 * Module dependencies.
 */

var ref = require('ref')
  , CIF = require('./cif')
  , assert = require('assert')
  , debug = require('debug')('ffi:FunctionType')
  , bindings = require('./bindings')
  , _Callback = bindings.Callback
  , POINTER_SIZE = ref.sizeof.pointer
 
/**
 * Module exports.
 */

module.exports = Function

/**
 * Creates and returns a "type" object for a C "function pointer".
 *
 * @api public
 */

function Function (retType, argTypes, abi) {
  debug('creating new FunctionType')

  // check args
  assert(!!retType, 'expected a return "type" object as the first argument')
  assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the second argument')

  // normalize the "types" (they could be strings, so turn into real type
  // instances)
  retType = ref.coerceType(retType)
  argTypes = argTypes.map(ref.coerceType)

  // create the `ffi_cif *` instance
  var cif = CIF(retType, argTypes, abi)
  var argc = argTypes.length

  function FunctionType (fn) {
    return _Callback(cif, retType.size, argc, function (retval, params) {
      debug('Callback function being invoked')

      var args = []
      for (var i = 0; i < argc; i++) {
        var type = argTypes[i]
        var argPtr = params.readPointer(i * POINTER_SIZE, type.size)
        argPtr.type = type
        args.push(argPtr.deref())
      }

      // Invoke the user-given function
      var result = fn.apply(null, args)
      retType.set(retval, 0, result)
    })
  }

  // ref "type" interface
  FunctionType.ffi_type = bindings.FFI_TYPES.pointer
  FunctionType.size = ref.sizeof.pointer
  FunctionType.alignment = ref.alignof.pointer
  FunctionType.indirection = 1
  FunctionType.get = get
  FunctionType.set = set

  return FunctionType
}

/**
 * get function
 */

function get (buffer, offset) {
  debug('ffi FunctionType "get" function')
  assert(0, 'implement!!!')
}

/**
 * set function
 */

function set (buffer, offset, value) {
  debug('ffi FunctionType "set" function')
  if ('function' == typeof value) {
    buffer.writePointer(this(value), offset)
  } else if (Buffer.isBuffer(value)) {
    buffer.writePointer(value, offset)
  } else {
    throw new Error('don\'t know how to set callback function for: ' + value)
  }
}
