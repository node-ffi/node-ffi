var FFI = require("./ffi");

var Callback = module.exports = function(typedata, func) {
    var retType = typedata[0],
        types   = typedata[1];

    this._cif   = new FFI.CIF(retType, types);
    this._info  = new FFI.CallbackInfo(this._cif.getPointer(), function (retval, params) {
        var pptr = params.seek(0);
        var args = [];

        for (var i = 0, len = types.length; i < len; i++) {
            args.push(FFI.derefValuePtr(types[i], pptr.getPointer(true)));
        }

        var methodResult = func.apply(this, args);

        if (retType != "void")
            retval["put" + FFI.TYPE_TO_POINTER_METHOD_MAP[retType]](methodResult);
    });

    this._pointer = this._info.pointer;
};

Callback.prototype.getPointer = function() {
    return this._pointer;
};
