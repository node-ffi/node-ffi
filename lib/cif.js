
var ffi = require('./ffi')
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

  // TODO: add checks to ensure valid "types" were passed in

  var cif = new Buffer(FFI_CIF_SIZE)

  var numArgs = types.length
  var _argtypesptr = new Buffer(numArgs * POINTER_SIZE)
  var _rtypeptr = ffi.ffiType(rtype)

  for (var i = 0; i < numArgs; i++) {
    var type = types[i]
    //console.error(type)
    var ffiType = ffi.ffiType(type)
    //console.error(ffiType)

    _argtypesptr.writePointer(ffiType, i * POINTER_SIZE)
  }

  if (typeof abi === 'undefined') {
    abi = FFI_DEFAULT_ABI
  }

  //console.error('cif:', cif)
  //console.error('numArgs:', numArgs)
  //console.error('_rtypeptr:', _rtypeptr)
  //console.error('_argtypesptr:', _argtypesptr)
  //console.error('ABI:', abi)
  var status = ffi.Bindings.ffi_prep_cif(cif, numArgs, _rtypeptr, _argtypesptr, abi)
  if (status !== FFI_OK) {
    throw new Error('ffi_prep_cif() returned an error: ' + status)
  }

  // prevent GC of the arg type and rtn type buffers
  cif.rtnTypePtr = _rtypeptr
  cif.argTypesPtr = _argtypesptr

  return cif
}
module.exports = CIF
