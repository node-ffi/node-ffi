var util = require("util");

var FFI = module.exports = {};

FFI.Bindings = require("../ffi_bindings");

FFI.VERSION = "0.2.0";

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
    return FFI.isValidParamType(typeDef) || typeName == "void";
}

FFI.derefValuePtr = function(type, ptr) {
    if (!FFI.isValidParamType(type)) {
        throw new Error("Invalid Type: " + type);
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

    var retPtr = FFI.Pointer.getDispatchTable[FFI.typeNameFor(type)].apply(dptr);

    return FFI.isStructType(type) ? new type(retPtr) : retPtr;
}

// Generates a derefValuePtr for a specific type
FFI.derefValuePtrFunc = function(type) {
    if (!FFI.isValidParamType(type)) {
        throw new Error("Invalid Type: " + type);
    }

    var getf = FFI.Pointer.getDispatchTable[FFI.typeNameFor(type)];

    if (type == "void") {
        return function(ptr) { return null; }
    }
    else if (type == "string") {
        return function(ptr) {
            var dptr = ptr.getPointer();
            
            if (dptr.isNull()) {
                return null;
            }
            
            return getf.call(dptr);
        }
    }
    else if (FFI.isStructType(type)) {
        return function(ptr) {
            return new type(getf.call(ptr));
        }
    }
    else {
        return function(ptr) {
            return getf.call(ptr);
        }
    }
};


FFI.typeNameFor = function(typeDef) {
    return FFI.isStructType(typeDef) ? "pointer" : typeDef;
}

FFI.sizeOf = function(typeDef) {
    return FFI.Bindings.TYPE_SIZE_MAP[FFI.typeNameFor(typeDef)];
}

FFI.ffiTypeFor = function(typeDef) {
    return FFI.Bindings.FFI_TYPES[FFI.typeNameFor(typeDef)];
}

FFI.isStructType = function(typeDef) {
    return (typeDef instanceof Object && "__isStructType__" in typeDef);
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

// Backwards compat
FFI.NULL_POINTER        = FFI.Pointer.NULL;
FFI.NULL_POINTER_PARAM  = FFI.Pointer.NULL_PARAM;