
var ref = require('ref')
var assert = require('assert')
var debug = require('debug')('ffi:ffi')

var ffi = module.exports

ffi.Bindings = require('bindings')('ffi_bindings.node')


/**
 * The extension to use on libraries.
 * i.e.  libm  ->  libm.so   on linux
 */

Object.defineProperty(ffi, 'LIB_EXT', {
    configurable: true
  , enumerable: true
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
ref.types.size_t = Object.create(ref.types.size_t)
ref.types.size_t.ffi_type = ffi.Bindings.FFI_TYPES.pointer

// XXX: temporary?
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
    throw new Error('unknown "long" size: ' + ref.sizeof.long)
}

/**
 * Coerces a String or "Type" instance into a real Type instance
 */

ffi.coerceType = function coerceType (type) {
  var rtn = type
  if (typeof type === 'string') {
    if (type === 'pointer') {
      // legacy "pointer" being used :(
      console.warn('type of "pointer" should not be used...')
      console.trace()
      rtn = ref.refType(ref.types.void) // void *
    } else if (type === 'string') {
      rtn = ref.types.Utf8String // char *
    } else {
      // allow string names to be passed in
      rtn = ref.types[type]
    }
  }
  assert(rtn && 'size' in rtn && 'indirection' in rtn
      , 'could not determine "type" from: ' + type)
  return rtn
}


/**
 * Returns a `ffi_type *` Buffer appropriate for the given "type".
 */

ffi.ffiType = function ffiType (type) {
  debug('ffiType()', type)
  type = ffi.coerceType(type)
  assert(type.indirection >= 1, 'invalid "type" given: ' + type)
  var rtn
  if (type.indirection === 1) {
    rtn = type.ffi_type
  } else {
    rtn = ffi.Bindings.FFI_TYPES.pointer
  }
  assert(rtn, 'Could not determine the `ffi_type` instance for type: ' + type)
  return rtn
}


// Direct exports from the bindings
ffi.CallbackInfo = ffi.Bindings.CallbackInfo

// Include our other modules
ffi.CIF = require('./cif')
ffi.ForeignFunction = require('./foreign_function')
ffi.DynamicLibrary = require('./dynamic_library')
ffi.Library = require('./library')
ffi.Callback = require('./callback')
ffi.Struct = require('./struct')
ffi.errno = require('./errno')

/**
 * Define the `FFI_TYPE` struct for use in JS.
 * This struct type is used internally to define custom struct rtn/arg types.
 */

/*ffi.FFI_TYPE = ffi.Struct(
    [ ref.types.size_t, 'size']
  , [ ref.types.ushort, 'alignment']
  , [ ref.types.ushort, 'type']
  , [ 'pointer' ,'elements']
)*/
