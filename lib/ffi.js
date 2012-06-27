
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

// Include our other modules
ffi.CIF = require('./cif')
ffi.CIF_var = require('./cif_var')
ffi.ForeignFunction = require('./foreign_function')
ffi.VariadicForeignFunction = require('./foreign_function_var')
ffi.DynamicLibrary = require('./dynamic_library')
ffi.Library = require('./library')
ffi.Callback = require('./callback')
ffi.errno = require('./errno')
ffi.ffiType = require('./type').Type
ffi.FFI_TYPE = require('./type').FFI_TYPE

