var FFI = require("./node-ffi");
var sys = require("sys");

exports.Pointer = FFI.Pointer;
exports.StaticFunctions = FFI.StaticFunctions;
exports.Bindings = FFI.Bindings;

exports.FFI_TYPE_MAP = {
    "void":     0,
    "int":      1,
    "float":    2,
    "double":   3,
    "ldouble":  3,
    "uint8":    5,
    "sint8":    6,
    "uint16":   7,
    "sint16":   8,
    "uint32":   9,
    "sint32":   10,
    "uint64":   11,
    "sint64":   12,
    "struct":   13,
    "pointer":  14
};

FFI.TYPE_TO_POINTER_METHOD_MAP = {
    "byte":     "Byte",
    "int32":    "Int32", 
    "uint32":   "UInt32", 
    "double":   "Double",
    "pointer":  "Pointer"
};

// typedef struct   ffi_cif {
//              ffi_abi     abi;
//              unsigned    nargs;
// /*@dependent@*/  ffi_type**  arg_types;
// /*@dependent@*/  ffi_type*   rtype;
//              unsigned    bytes;
//              unsigned    flags;
// #ifdef FFI_EXTRA_CIF_FIELDS
//              FFI_EXTRA_CIF_FIELDS;
// #endif
// } ffi_cif;

FFI.Bindings.CIF_SIZE = (
    FFI.Bindings.ENUM_SIZE + 
    (FFI.Bindings.POINTER_SIZE * 2) +
    4 * 3
);

exports.buildCif = function(nargs, types, rtype, bytes, flags) {
    var cifPtr = new Pointer(FFI.Bindings.CIF_SIZE);
};

FFI.StructType = function(fields) {
    this._struct = {};
    this._members = [];
    this._size = 0;
    this._alignment = 0;
    
    if (fields) {
        for (var i = 0; i < fields.length; i++) {
            FFI.StructType.prototype.addField.apply(this, fields[i]);
        }
    }
};

// WARNING: This call is going to be unsafe if called after the constructor
FFI.StructType.prototype.addField = function(type, name) {
    // TODO: check to see if name already exists
    var sz = FFI.Bindings.TYPE_SIZE_MAP[type];
    var offset = this._size;
    
    this._size += sz;
    this._alignment = Math.max(this._alignment, sz);
    this._size += Math.abs(this._alignment - sz);
    
    this._struct[name] = { "name": name, "type": type, "size": sz, "offset": offset };
    this._members.push(name);
};

FFI.StructType.prototype.readField = function(ptr, name) {
    var info = this._struct[name];
    var fptr = ptr.seek(info.offset);
    return fptr["get" + FFI.TYPE_TO_POINTER_METHOD_MAP[info.type]]();
};

FFI.StructType.prototype.writeField = function(ptr, name, val) {
    var info = this._struct[name];
    var fptr = ptr.seek(info.offset);
    return fptr["put" + FFI.TYPE_TO_POINTER_METHOD_MAP[info.type]](val);    
};

FFI.StructType.prototype.serialize = function(ptr, data) {
    for (var i = 0; i < this._members.length; i++) {
        var name = this._members[i];
        this.writeField(ptr, name, data[name]);
    }
};

FFI.StructType.prototype.deserialize = function(ptr) {
    var data = {};
    
    for (var i = 0; i < this._members.length; i++) {
        var name = this._members[i];
        data[name] = this.readField(ptr, name);
    }
};

FFI.StructType.prototype.allocate = function(data) {
    var ptr = new FFI.Pointer(this._size);
    
    if (data) {
        this.serialize(ptr, data);
    }
    
    return ptr;
};

FFI.Internal = {};

FFI.Internal.CIF = new FFI.StructType([
    [ "uint32",     "ffi_abi" ],
    [ "uint32",     "nargs" ],
    [ "pointer",    "arg_types" ],
    [ "pointer",    "rtype" ],
    [ "uint32",     "bytes" ],
    [ "uint32",     "flags" ]
]);

FFI.Internal.buildCIFArgTypes = function(types) {
    var ptr = new FFI.Pointer(types.length * FFI.Bindings.FFI_TYPE_SIZE);
    var cptr = ptr.seek(0);
    
    for (var i = 0; i < types.length; i++) {
        cptr.putPointer(FFI.Bindings.FFI_TYPES[types[i]], true);
    }
    
    return ptr;
};

exports.Internal = FFI.Internal;
exports.StructType = FFI.StructType;
