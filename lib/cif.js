
var ffi = require('./ffi')
  , assert = require('assert')
  , debug = require('debug')('ffi:cif')
  , ref = require('ref')
  , POINTER_SIZE = ref.sizeof.pointer
  , FFI_OK = ffi.Bindings.FFI_OK
  , FFI_CIF_SIZE = ffi.Bindings.FFI_CIF_SIZE
  , FFI_TYPE_SIZE = ffi.Bindings.FFI_TYPE_SIZE
  , FFI_DEFAULT_ABI = ffi.Bindings.FFI_DEFAULT_ABI

/**
 * JS wrapper for the `ffi_prep_cif` function.
 * Returns a Buffer instance representing a `ffi_cif *` instance.
 */

function CIF (rtype, types, abi) {
  debug('creating `ffi_cif *` instance')

  assert(!!rtype, 'expected a return "type" object as the first argument')
  assert(Array.isArray(types), 'expected an Array of arg "type" objects as the second argument')

  // the buffer that will contain the return `ffi_cif *` instance
  var cif = new Buffer(FFI_CIF_SIZE)

  var numArgs = types.length
  var _argtypesptr = new Buffer(numArgs * POINTER_SIZE)
  var _rtypeptr = ffi.ffiType(rtype)

  for (var i = 0; i < numArgs; i++) {
    var type = types[i]
    var ffiType = ffi.ffiType(type)

    _argtypesptr.writePointer(ffiType, i * POINTER_SIZE)
  }

  if (typeof abi === 'undefined') {
    debug('no ABI specified (this is OK), using FFI_DEFAULT_ABI')
    abi = FFI_DEFAULT_ABI
  }

  var status = ffi.Bindings.ffi_prep_cif(cif, numArgs, _rtypeptr, _argtypesptr, abi)
  if (status !== FFI_OK) {
    throw new Error('ffi_prep_cif() returned an error: ' + status)
  }

  // prevent GC of the arg type and rtn type buffers (not sure if this is required)
  cif.rtnTypePtr = _rtypeptr
  cif.argTypesPtr = _argtypesptr

  return cif
}
module.exports = CIF
