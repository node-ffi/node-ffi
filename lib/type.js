
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
 *
 * @param {Type|String} type A "ref" type (or string) to get the `ffi_type` for
 * @return {Buffer} A buffer pointing to a `ffi_type` instance for "type"
 * @api private
 */

function Type (type) {
  type = ref.coerceType(type)
  debug('Type()', type.name || type)
  assert(type.indirection >= 1, 'invalid "type" given: ' + (type.name || type))
  var rtn

  // first we assume it's a regular "type". if the "indirection" is greater than
  // 1, then we can just use "pointer" ffi_type, otherwise we hope "ffi_type" is
  // set
  if (type.indirection === 1) {
    rtn = type.ffi_type
  } else {
    rtn = bindings.FFI_TYPES.pointer
  }

  // if "rtn" isn't set (ffi_type was not set) then we check for "ref-array" type
  if (!rtn && type.type) {
    // got a "ref-array" type
    // passing arrays to C functions are always by reference, so we use "pointer"
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

    // hand-crafting a null-terminated array here.
    // XXX: use "ref-array"?
    var elementsSize = ref.sizeof.pointer * (numProps + 1) // +1 because of the NULL terminator
    var elements = t.elements = new Buffer(elementsSize)
    for (var i = 0; i < numProps; i++) {
      var prop = props[propNames[i]]
      var ffi_type_ptr = Type(prop.type)
      // TODO: handle "fixedLength" arrays within structs (figure out what libffi
      // wants us to do...)
      elements.writePointer(ffi_type_ptr, i * ref.sizeof.pointer)
    }
    // final NULL pointer to terminate the Array
    elements.writePointer(ref.NULL, i * ref.sizeof.pointer)
    // also set the `ffi_type` property to that it's cached for next time
    rtn = type.ffi_type = t.ref()
  }

  // TODO: handle "ref" type's that don't have this set (i.e. a separate copy of
  // ref than the one node-ffi is using) (check the "name" property?)
  assert(rtn, 'Could not determine the `ffi_type` instance for type: ' + (type.name || type))
  debug('returning `ffi_type`', rtn.name)
  return rtn
}
module.exports = Type
