var ffi = require('./ffi')

/**
 * Turns a JavaScript function into a C function pointer.
 * The function pointer may be used in other C functions that
 * accept C callback functions.
 * TODO: Deprecate this class, make this function return the callback pointer
 *       directly.
 */

function Callback (typedata, func) {
  var retType = typedata[0]
    , types   = typedata[1]

  this._cif   = new ffi.CIF(retType, types)
  this._info  = new ffi.CallbackInfo(this._cif.getPointer(), function (retval, params) {
    var pptr = params.seek(0)
      , args = []

    for (var i=0, len=types.length; i<len; i++) {
      args.push(ffi.derefValuePtr(types[i], pptr.getPointer(true)))
    }

    var result = func.apply(this, args)

    if (retType !== 'void') {
      retval['put' + ffi.TYPE_TO_POINTER_METHOD_MAP[retType]](result)
    }
  })

  this.pointer = this._info.pointer
}
module.exports = Callback

/**
 * Returns the callback function pointer. Deprecated. Use `callback.pointer`
 * instead.
 */

Callback.prototype.getPointer = function getPointer () {
  return this.pointer
}
