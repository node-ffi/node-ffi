
/**
 * Module dependencies.
 */

var ref = require('ref')
var assert = require('assert')
var debug = require('debug')('ffi:types')
var Struct = require('ref-struct')
var bindings = require('./bindings')

/**
 * Define the `ffi_type` struct (see deps/libffi/include/ffi.h) for use in JS.
 * This struct type is used internally to define custom struct rtn/arg types.
 */

var FFI_TYPE = Type.FFI_TYPE = Struct()
FFI_TYPE.defineProperty('size',      ref.types.size_t)
FFI_TYPE.defineProperty('alignment', ref.types.ushort)
FFI_TYPE.defineProperty('type',      ref.types.ushort)
// this last prop is a C Array of `ffi_type *` elements, so this is `ffi_type **`
var ffi_type_ptr_array = ref.refType(ref.refType(FFI_TYPE))
FFI_TYPE.defineProperty('elements',  ffi_type_ptr_array)
assert.equal(bindings.FFI_TYPE_SIZE, FFI_TYPE.size)

/**
 * Returns a `ffi_type *` Buffer appropriate for the given "type".
 */

function Type (type) {
  debug('Type()', type.name || type)
  type = ref.coerceType(type)
  assert(type.indirection >= 1, 'invalid "type" given: ' + (type.name || type))
  var rtn
  if (type.indirection === 1) {
    rtn = type.ffi_type
  } else {
    rtn = bindings.FFI_TYPES.pointer
  }

  if (!rtn && type.fields) {
    // got a "ref-struct" type
    // need to create the `ffi_type` instance manually
    debug('creating an `ffi_type` for given "ref-struct" type')
    var props = type.fields
      , propNames = Object.keys(props)
      , numProps = propNames.length
    var t = new FFI_TYPE
    t.size = 0
    t.alignment = 0
    t.type = 13 // FFI_TYPE_STRUCT
    var elementsSize = ref.sizeof.pointer * (numProps + 1) // +1 because of the NULL terminator
    var elements = t.elements = new Buffer(elementsSize)
    for (var i = 0; i < numProps; i++) {
      var prop = props[propNames[i]]
      elements.writePointer(Type(prop.type), i * ref.sizeof.pointer)
    }
    // final NULL pointer to terminate the Array
    elements.writePointer(ref.NULL, i * ref.sizeof.pointer)
    // also set the `ffi_type` property to that it's cached for next time
    rtn = type.ffi_type = t.ref()
  }
  assert(rtn, 'Could not determine the `ffi_type` instance for type: ' + (type.name || type))
  debug('returning `ffi_type`', rtn.name)
  return rtn
}
module.exports = Type
