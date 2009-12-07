var FFI = require("./node-ffi");
var sys = require("sys");

FFI.TYPE_TO_POINTER_METHOD_MAP = {
    "byte":     "Byte",
    "int8":     "Int8",
    "int16":    "Int16",
    "uint16":   "UInt16",      
    "int32":    "Int32",
    "uint32":   "UInt32", 
    "float":    "Float",
    "double":   "Double",
    "string":   "CString", 
    "pointer":  "Pointer"
};

FFI.PLATFORM_LIBRARY_EXTENSIONS = {
    "linux2":   ".so",
    "darwin":   ".dylib"
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
FFI.NULL_POINTER = new FFI.Pointer(0);
FFI.NULL_POINTER_PARAM = new FFI.Pointer(FFI.Bindings.POINTER_SIZE);
FFI.NULL_POINTER_PARAM.putPointer(FFI.NULL_POINTER);

FFI.Internal.isValidParamType = function(typeName) {
    return FFI.Bindings.FFI_TYPES[typeName] != undefined;
};

FFI.Internal.isValidReturnType = function(typeName) {
    return FFI.Bindings.FFI_TYPES[typeName] != undefined || typeName == "void";
};

FFI.Internal.buildCIFArgTypes = function(types) {
    var ptr = new FFI.Pointer(types.length * FFI.Bindings.FFI_TYPE_SIZE);
    var cptr = ptr.seek(0);
    
    for (var i = 0; i < types.length; i++) {
        if (FFI.Internal.isValidParamType(types[i])) {
            cptr.putPointer(FFI.Bindings.FFI_TYPES[types[i]], true);
        }
        else {
            throw new Error("Invalid Type: " + types[i]);
        }
    }
    
    return ptr;
};

FFI.Internal.buildCIFArgValues = function(vals) {
    var ptr = new FFI.Pointer(vals.length * FFI.Bindings.POINTER_SIZE);
    var cptr = ptr.seek(0);
    
    for (var i = 0; i < vals.length; i++) {
        cptr.putPointer(vals[i], true);
    }
    
    return ptr;
};

FFI.Internal.bareMethodFactory = function(ptr, returnType, types) {
    if (!FFI.Internal.isValidReturnType(returnType))
        throw new Error("Invalid Return Type: " + returnType);
    
    var atypes  = FFI.Internal.buildCIFArgTypes(types);
    var rtype   = FFI.Bindings.FFI_TYPES[returnType];
    var cif     = FFI.Bindings.prepCif(types.length, rtype, atypes);
    
    return function(argPtrs) {
        var res     = new FFI.Pointer(FFI.Bindings.TYPE_SIZE_MAP[returnType]);
        var args    = FFI.Internal.buildCIFArgValues(argPtrs);
        
        FFI.Bindings.call(cif, ptr, args, res);
        
        return res;
    };
};

FFI.Internal.buildValue = function(type, val) {
    if (!FFI.Internal.isValidParamType(type)) throw new Error("Invalid Type: " + type);
    
    if (val == null)
        return FFI.NULL_POINTER_PARAM;
    
    var ptr = new FFI.Pointer(type == "string" ? val.length + 1 : FFI.Bindings.TYPE_SIZE_MAP[type]);
    ptr["put" + FFI.TYPE_TO_POINTER_METHOD_MAP[type]](val);
    
    if (type == "string") {
        // we have to actually build an "in-between" pointer for strings
        var dptr = new FFI.Pointer(FFI.Bindings.TYPE_SIZE_MAP["pointer"]);
        dptr.putPointer(ptr);
        return dptr;
    }
    else {
        return ptr;
    }
};

FFI.Internal.extractValue = function(type, ptr) {
    if (!FFI.Internal.isValidParamType(type)) throw new Error("Invalid Type: " + type);
    
    var dptr = ptr;
    
    if (type == "string") {
        dptr = ptr.getPointer();
        if (dptr.isNull()) {
            throw new Error("Attempted to dereference null string/pointer");
        }
    }
    
    return dptr["get" + FFI.TYPE_TO_POINTER_METHOD_MAP[type]]();
};

FFI.Internal.methodFactory = function(ptr, returnType, types) {
    if (!FFI.Internal.isValidReturnType(returnType))
        throw new Error("Invalid Return Type: " + returnType);
        
    var bareMethod = FFI.Internal.bareMethodFactory(ptr, returnType, types);
    
    return function() {
        var args = [];
        
        for (var i = 0; i < types.length; i++) {
            args[i] = FFI.Internal.buildValue(types[i], arguments[i]);
        }
        
        var methodResult = bareMethod(args);
        
        return returnType == "void" ? null : FFI.Internal.extractValue(returnType, methodResult);
    };
};

// From <dlfcn.h> on Darwin: #define RTLD_DEFAULT    ((void *) -2)
FFI.DARWIN_RTLD_DEFAULT = FFI.NULL_POINTER.seek(-2);

FFI.DynamicLibrary = function(path, mode) {
    if (path == null && process.platform == "darwin") {
        this._handle = FFI.DARWIN_RTLD_DEFAULT;
        this.close = function() { }; // neuter close
    }
    else {
        this._handle = this._dlopen(path, mode);

        if (this._handle.isNull()) {
            throw new Error("Dynamic Linking Error: " + this._dlerror());
        }
    }
};

FFI.DynamicLibrary.FLAGS = {
    "RTLD_LAZY":    0x1,
    "RTLD_NOW":     0x2,
    "RTLD_LOCAL":   0x4,
    "RTLD_GLOBAL":  0x8
};

FFI.DynamicLibrary.prototype._dlopen = FFI.Internal.methodFactory(
    FFI.StaticFunctions.dlopen,
    "pointer",
    [ "string", "int32" ]
);

FFI.DynamicLibrary.prototype._dlclose = FFI.Internal.methodFactory(
    FFI.StaticFunctions.dlclose,
    "int32",
    [ "pointer" ]
);

FFI.DynamicLibrary.prototype._dlsym = FFI.Internal.methodFactory(
    FFI.StaticFunctions.dlsym,
    "pointer",
    [ "pointer", "string" ]
);

FFI.DynamicLibrary.prototype._dlerror = FFI.Internal.methodFactory (
    FFI.StaticFunctions.dlerror,
    "string",
    [ ]
);

FFI.DynamicLibrary.prototype.close = function() {
    return this._dlclose(this._handle);
};

FFI.DynamicLibrary.prototype.get = function(symbol) {
    var ptr;

    if ((ptr = this._dlsym(this._handle, symbol)).isNull()) {
        throw new Error("Dynamic Symbol Retrieval Error: " + this.error());
    }

    return ptr;
};

FFI.DynamicLibrary.prototype.error = function() {
    return this._dlerror();
};

/////////////////////

FFI.Library = function(libfile, funcs, options) {
    var dl = new FFI.DynamicLibrary(
        libfile == null ? null : libfile + FFI.PLATFORM_LIBRARY_EXTENSIONS[process.platform],
        FFI.DynamicLibrary.FLAGS.RTLD_NOW
    );
  
    for (var k in funcs) {
        var fptr = dl.get(k);
        if (fptr.isNull()) throw new Error("DynamicLibrary returned NULL function pointer.");
        var resultType = funcs[k][0], paramTypes = funcs[k][1];
        this[k] = FFI.Internal.methodFactory(fptr, resultType, paramTypes);
    }
};

/////////////////////

FFI.Callback = function(typedata, func) {
    var retType = typedata[0], types = typedata[1];
    var cif = FFI.Bindings.prepCif(
        types.length,
        FFI.Bindings.FFI_TYPES[retType],
        FFI.Internal.buildCIFArgTypes(types)
    );
    
    this._info = new FFI.CallbackInfo(cif, function (retval, params) {
        var pptr = params.seek(0);
        var args = [];
        
        for (var i = 0; i < types.length; i++) {
            args.push(FFI.Internal.extractValue(types[i], pptr.getPointer(true)));
        }
        
        var methodResult = func.apply(this, args);
        
        if (retType != "void")
            retval["put" + FFI.TYPE_TO_POINTER_METHOD_MAP[retType]](methodResult);      
    });
};

FFI.Callback.prototype.getPointer = function() {
    return this._info.pointer;
};

// Export Everything
for (var k in FFI) { exports[k] = FFI[k]; }