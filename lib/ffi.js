
var ref = require('ref')
var assert = require('assert')
var debug = require('debug')('ffi:ffi')
var Struct = require('ref-struct')

var ffi = module.exports

ffi.Bindings = require('bindings')('ffi_bindings.node')


/**
 * The extension to use on libraries.
 * i.e.  libm  ->  libm.so   on linux
 */

Object.defineProperty(ffi, 'LIB_EXT', {
    configurable: true
  , enumerable: true
  , writable: false
  , value: {
        'linux':  '.so'
      , 'linux2': '.so'
      , 'sunos':  '.so'
      , 'solaris':'.so'
      , 'darwin': '.dylib'
      , 'mac':    '.dylib'
      , 'win32':  '.dll'
    }[process.platform]
})

/**
 * Set the `ffi_type` property on the built-in types.
 */

Object.keys(ffi.Bindings.FFI_TYPES).forEach(function (name) {
  if (name === 'pointer') return
  var ffi_type = ffi.Bindings.FFI_TYPES[name]
  ref.types[name].ffi_type = ffi_type
})

// make `size_t` use the "ffi_type_pointer"
ref.types.size_t = ref.cloneType(ref.types.size_t)
ref.types.size_t.ffi_type = ffi.Bindings.FFI_TYPES.pointer

// make `Utf8String` use "ffi_type_pointer"
ref.types.Utf8String.ffi_type = ffi.Bindings.FFI_TYPES.pointer


// libffi is weird when it comes to long data types (defaults to 64-bit),
// so we emulate here, since some platforms have 32-bit longs and some
// platforms have 64-bit longs.
switch (ref.sizeof.long) {
  case 4:
    ref.types.ulong.ffi_type = ffi.Bindings.FFI_TYPES.uint32
    ref.types.long.ffi_type = ffi.Bindings.FFI_TYPES.int32
    break;
  case 8:
    ref.types.ulong.ffi_type = ffi.Bindings.FFI_TYPES.uint64
    ref.types.long.ffi_type = ffi.Bindings.FFI_TYPES.int64
    break;
  default:
    throw new Error('unsupported "long" size: ' + ref.sizeof.long)
}


/**
 * Returns a `ffi_type *` Buffer appropriate for the given "type".
 */

ffi.ffiType = function ffiType (type) {
  debug('ffiType()', type)
  type = ref.coerceType(type)
  assert(type.indirection >= 1, 'invalid "type" given: ' + type)
  var rtn
  if (type.indirection === 1) {
    rtn = type.ffi_type
  } else {
    rtn = ffi.Bindings.FFI_TYPES.pointer
  }

  if (!rtn && type.fields) {
    // got a "ref-struct" type
    // need to create the `ffi_type` instance manually
    debug('creating an `ffi_type` for given "ref-struct" type')
    var props = type.fields
      , propNames = Object.keys(props)
      , numProps = propNames.length
    var t = new ffi.FFI_TYPE
    t.size = 0
    t.alignment = 0
    t.type = 13 // FFI_TYPE_STRUCT
    var elementsSize = ref.sizeof.pointer * (numProps + 1) // +1 because of the NULL terminator
    var elements = t.elements = new Buffer(elementsSize)
    for (var i = 0; i < numProps; i++) {
      var prop = props[propNames[i]]
      elements.writePointer(ffi.ffiType(prop.type), i * ref.sizeof.pointer)
    }
    // final NULL pointer to terminate the Array
    elements.writePointer(ref.NULL, i * ref.sizeof.pointer)
    // also set the `ffi_type` property to that it's cached for next time
    rtn = type.ffi_type = t.ref()
  }
  assert(rtn, 'Could not determine the `ffi_type` instance for type: ' + type)
  return rtn
}


// Include our other modules
ffi.CIF = require('./cif')
ffi.CIF_var = require('./cif_var')
ffi.ForeignFunction = require('./foreign_function')
ffi.VariadicForeignFunction = require('./foreign_function_var')
ffi.DynamicLibrary = require('./dynamic_library')
ffi.Library = require('./library')
ffi.Callback = require('./callback')
ffi.errno = require('./errno')

/**
 * Define the `ffi_type` struct (see deps/libffi/include/ffi.h) for use in JS.
 * This struct type is used internally to define custom struct rtn/arg types.
 */

ffi.FFI_TYPE = Struct()
ffi.FFI_TYPE.defineProperty('size',      ref.types.size_t)
ffi.FFI_TYPE.defineProperty('alignment', ref.types.ushort)
ffi.FFI_TYPE.defineProperty('type',      ref.types.ushort)
// this last prop is a C Array of `ffi_type *` elements, so this is `ffi_type **`
var ffi_type_ptr_array = ref.refType(ref.refType(ffi.FFI_TYPE))
ffi.FFI_TYPE.defineProperty('elements',  ffi_type_ptr_array)
assert.equal(ffi.Bindings.FFI_TYPE_SIZE, ffi.FFI_TYPE.size)
