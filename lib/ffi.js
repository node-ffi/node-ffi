
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


/**
 * Utf8Strings are a kind of weird thing. We say it's a sizeof(char *),
 * so that means that we have to return a Buffer that is pointer sized, and points
 * to a some utf8 string data, so we have to create a 2nd "in-between" buffer.
 *
 * Really, people should just use a proper `char *` type.
 * This is only here for legacy purposes...
 */

ffi.Utf8String = {
    size: ref.sizeof.pointer
  , ffi_type: ffi.Bindings.FFI_TYPES.pointer
  , indirection: 1
  , get: function get (buf, offset) {
      var _buf = buf.readPointer(offset)
      return _buf.readCString(0)
    }
  , set: function set (buf, offset, val) {
      var _buf = ref.allocCString(val)
      return buf.writePointer(_buf, offset)
    }
}


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
      rtn = ffi.Utf8String // char *
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


// Include our other modules
ffi.CIF = require('./cif')
ffi.ForeignFunction = require('./foreign_function')
ffi.DynamicLibrary = require('./dynamic_library')
ffi.Library = require('./library')
ffi.Callback = require('./callback')
ffi.errno = require('./errno')

/**
 * Define the `FFI_TYPE` struct for use in JS.
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
