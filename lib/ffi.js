
var ref = require('ref')
var assert = require('assert')
var debug = require('debug')('ffi:ffi')
var Struct = require('ref-struct')
var bindings = require('./bindings')
var ffi = exports

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
 * Export some of the properties from the "bindings" file.
 */

;['HAS_OBJC', 'FFI_TYPES',
, 'FFI_OK', 'FFI_BAD_TYPEDEF', 'FFI_BAD_ABI'
, 'FFI_DEFAULT_ABI', 'FFI_LAST_ABI', 'FFI_SYSV', 'FFI_UNIX64', 'FFI_WIN64'
, 'FFI_STDCALL', 'FFI_THISCALL', 'FFI_FASTCALL', 'FFI_MS_CDECL'].forEach(function (prop) {
  if (!bindings.hasOwnProperty(prop)) {
    return debug('skipping exporting of non-existant property: %s', prop)
  }
  var desc = Object.getOwnPropertyDescriptor(bindings, prop)
  Object.defineProperty(ffi, prop, desc)
})

/**
 * Set the `ffi_type` property on the built-in types.
 */

Object.keys(bindings.FFI_TYPES).forEach(function (name) {
  var type = bindings.FFI_TYPES[name]
  type.name = name
  if (name === 'pointer') return // there is no "pointer" type...
  ref.types[name].ffi_type = type
})

// make `size_t` use the "ffi_type_pointer"
ref.types.size_t.ffi_type = bindings.FFI_TYPES.pointer

// make `Utf8String` use "ffi_type_pointer"
ref.types.Utf8String.ffi_type = bindings.FFI_TYPES.pointer

// make `Object` use the "ffi_type_pointer"
ref.types.Object.ffi_type = bindings.FFI_TYPES.pointer


// libffi is weird when it comes to long data types (defaults to 64-bit),
// so we emulate here, since some platforms have 32-bit longs and some
// platforms have 64-bit longs.
switch (ref.sizeof.long) {
  case 4:
    ref.types.ulong.ffi_type = bindings.FFI_TYPES.uint32
    ref.types.long.ffi_type = bindings.FFI_TYPES.int32
    break;
  case 8:
    ref.types.ulong.ffi_type = bindings.FFI_TYPES.uint64
    ref.types.long.ffi_type = bindings.FFI_TYPES.int64
    break;
  default:
    throw new Error('unsupported "long" size: ' + ref.sizeof.long)
}

/**
 * Alias the "ref" types onto ffi's exports, for convenience...
 */

ffi.types = ref.types


/**
 * Returns a `ffi_type *` Buffer appropriate for the given "type".
 */

ffi.ffiType = function ffiType (type) {
  debug('ffiType()', type.name || type)
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
  assert(rtn, 'Could not determine the `ffi_type` instance for type: ' + (type.name || type))
  debug('returning `ffi_type`', rtn.name)
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
assert.equal(bindings.FFI_TYPE_SIZE, ffi.FFI_TYPE.size)
