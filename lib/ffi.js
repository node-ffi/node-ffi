var util = require("util");

var FFI = module.exports = {};

try {
  FFI.Bindings = require("../build/Release/ffi_bindings");
} catch (e) { try {
  FFI.Bindings = require("../build/default/ffi_bindings");
} catch (e) {
  throw e;
}}

FFI.VERSION = "0.4.2";

FFI.TYPE_TO_POINTER_METHOD_MAP = {
    "uint8":    "UInt8",
    "int8":     "Int8",
    "uint8":    "UInt8",
    "int16":    "Int16",
    "uint16":   "UInt16",
    "int32":    "Int32",
    "uint32":   "UInt32",
    "int64":    "Int64",
    "uint64":   "UInt64",
    "float":    "Float",
    "double":   "Double",
    "string":   "CString",
    "pointer":  "Pointer",
};

FFI.SIZE_TO_POINTER_METHOD_MAP = {
    1: "Int8",
    2: "Int16",
    4: "Int32",
    8: "Int64"
};

FFI.PLATFORM_LIBRARY_EXTENSIONS = {
    "linux":    ".so",
    "linux2":   ".so",
    "darwin":   ".dylib",
    "sunos":    ".so"
};

// A list of types with no hard C++ methods to read/write them
FFI.NON_SPECIFIC_TYPES = {
    "byte":       "Byte",
    "char":       "Char",
    "uchar":      "UChar",
    "short":      "Short",
    "ushort":     "UShort",
    "int":        "Int",
    "uint":       "UInt",
    "long":       "Long",
    "ulong":      "ULong",
    "longlong":   "LongLong",
    "ulonglong":  "ULongLong",
    "size_t":     "SizeT"
};

// The initial buffer size of string arguments
FFI.STRING_ARGUMENT_BUFFER_SIZE = 256;

// ------------------------------------------------------
// Miscellaneous Utility Functions
// ------------------------------------------------------

// Returns true if the passed typeDef is a valid param type
FFI.isValidParamType = function(typeDef) {
    return FFI.isStructType(typeDef) || FFI.Bindings.FFI_TYPES[typeDef] != undefined;
}

// Returns true if the passed typeDef is a valid return type
FFI.isValidReturnType = function(typeDef) {
    return FFI.isValidParamType(typeDef) || typeDef == "void";
}

FFI.derefValuePtr = function(type, ptr) {
    if (!FFI.isValidParamType(type)) {
        throw new Error("Invalid Type: " + type);
    }

    if (FFI.isStructType(type)) {
        return new type(ptr);
    }

    if (type == "void") {
        return null;
    }

    var dptr = ptr;

    if (type == "string") {
        dptr = ptr.getPointer();
        if (dptr.isNull()) {
            return null;
        }
    }

    var retPtr = FFI.Pointer.getDispatchTable[type].call(dptr);

    return retPtr;
}

// Generates a derefValuePtr for a specific type
FFI.derefValuePtrFunc = function(type) {
    if (!FFI.isValidParamType(type)) {
        throw new Error("Invalid Type: " + type);
    }

    if (FFI.isStructType(type)) {
        return function(ptr) {
            return new type(ptr);
        }
    }

    if (type == "void") {
        return function(ptr) { return null; }
    }

    var getf = FFI.Pointer.getDispatchTable[type];
    if (type == "string") {
        return function(ptr) {
            var dptr = ptr.getPointer();

            if (dptr.isNull()) {
                return null;
            }

            return getf.call(dptr);
        }
    } else {
        return function(ptr) {
            return getf.call(ptr);
        }
    }
};

FFI.sizeOf = function(typeDef) {
    return FFI.isStructType(typeDef)
        ? typeDef.__structInfo__.size
        : FFI.Bindings.TYPE_SIZE_MAP[typeDef]
}

FFI.ffiTypeFor = function(typeDef) {
    return FFI.isStructType(typeDef)
        ? typeDef._ffiType().ref()
        : FFI.Bindings.FFI_TYPES[typeDef]
}

FFI.isStructType = function(typeDef) {
    return !!typeDef.__isStructType__
}

FFI.CallbackInfo        = FFI.Bindings.CallbackInfo;

// Include our other modules
FFI.Pointer             = require("./pointer");

// From <dlfcn.h> on Darwin: #define RTLD_DEFAULT    ((void *) -2)
FFI.DARWIN_RTLD_DEFAULT = FFI.Pointer.NULL.seek(-2);

FFI.CIF                 = require("./cif");
FFI.ForeignFunction     = require("./foreign_function");
FFI.DynamicLibrary      = require("./dynamic_library");
FFI.Library             = require("./library");
FFI.Callback            = require("./callback");
FFI.Struct              = require("./struct");
FFI.errno               = require("./errno");
FFI.free                = FFI.Bindings.free;

// Backwards compat
FFI.NULL_POINTER        = FFI.Pointer.NULL;
FFI.NULL_POINTER_PARAM  = FFI.Pointer.NULL_PARAM;

// Define the `ffi_type` struct for use in JS
FFI.FFI_TYPE = FFI.Struct([
    ['size_t','size']
  , ['ushort','alignment']
  , ['ushort','type']
  , ['pointer','elements']
])
