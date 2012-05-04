var ffi = require('./ffi')
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
  var _argtypesptr = new Buffer(numArgs * FFI_TYPE_SIZE)
  var _rtypeptr = ffi.ffiTypeFor(rtype)

  for (var i = 0; i < numArgs; i++) {
    var type = types[i]

    /*if (!ffi.isValidParamType(typeName)) {
      throw new Error('Invalid Type: ' + typeName)
    }*/

    var ffiType = ffi.ffiTypeFor(type)
    _argtypesptr.writePointer(ffiType, i * FFI_TYPE_SIZE)
  }

  if (typeof abi === 'undefined') {
    abi = FFI_DEFAULT_ABI
  }

  var status = ffi.Bindings.prepCif(cif, numArgs, _rtypeptr, _argtypesptr, abi)
  if (status !== FFI_OK) {
    throw new Error('ffi_prep_cif() returned an error: ' + status)
  }

  // prevent GC of the arg type and rtn type buffers
  cif.rtnTypePtr = _rtypeptr
  cif.argTypesPtr = _argtypesptr

  return cif
}
module.exports = CIF
