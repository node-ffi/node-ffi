var FFI     = require("./_ffi");
var sys     = require("sys");
var events  = require("events");

(function() {

FFI.VERSION = "0.1.2";

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

// create fast dispatch tables for type calls
var FFI_POINTER_PUT_DISPATCH_TABLE = {};
var FFI_POINTER_GET_DISPATCH_TABLE = {};

for (var type in FFI.TYPE_TO_POINTER_METHOD_MAP) {
    FFI_POINTER_PUT_DISPATCH_TABLE[type] = 
        FFI.Pointer.prototype["put" + FFI.TYPE_TO_POINTER_METHOD_MAP[type]];
    FFI_POINTER_GET_DISPATCH_TABLE[type] = 
        FFI.Pointer.prototype["get" + FFI.TYPE_TO_POINTER_METHOD_MAP[type]];
}

FFI.Pointer.prototype.attach = function(friend) {
    if (friend.__attached == undefined)
        friend.__attached = [];
    
    friend.__attached.push(this);
};

FFI.StructType = function(fields) {
    this._struct    = {};
    this._members   = [];
    this._size      = 0;
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
    var sz      = FFI.Bindings.TYPE_SIZE_MAP[type],
        offset  = this._size;
    
    this._size      += sz;
    this._alignment  = Math.max(this._alignment, sz);
    this._size      += Math.abs(this._alignment - sz);
    
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
    for (var i = 0, len = this._members.length; i < len; i++) {
        var name = this._members[i];
        this.writeField(ptr, name, data[name]);
    }
};

FFI.StructType.prototype.deserialize = function(ptr) {
    var data = {};
    
    for (var i = 0, len = this._members.length; i < len; i++) {
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

FFI.NULL_POINTER        = new FFI.Pointer(0);
FFI.NULL_POINTER_PARAM  = new FFI.Pointer(FFI.Bindings.POINTER_SIZE);
FFI.NULL_POINTER_PARAM.putPointer(FFI.NULL_POINTER);

function isValidParamType(typeName) {
    return FFI.Bindings.FFI_TYPES[typeName] != undefined;
};

function isValidReturnType(typeName) {
    return FFI.Bindings.FFI_TYPES[typeName] != undefined || typeName == "void";
};

FFI.CIF = function(rtype, types) {
    this._returnType    = rtype;
    this._types         = types;
    
    if (!isValidReturnType(this._returnType)) throw new Error("Invalid Return Type");
    
    this._argtypesptr   = new FFI.Pointer(types.length * FFI.Bindings.FFI_TYPE_SIZE);
    this._rtypeptr      = FFI.Bindings.FFI_TYPES[this._returnType];
    
    var tptr = this._argtypesptr.seek(0);
    
    for (var i = 0, len = types.length; i < len; i++) {
        if (isValidParamType(types[i])) {
            tptr.putPointer(FFI.Bindings.FFI_TYPES[types[i]], true);
        }
        else {
            throw new Error("Invalid Type: " + types[i]);
        }
    }
    
    this._cifptr = FFI.Bindings.prepCif(types.length, this._rtypeptr, this._argtypesptr);    
};

FFI.CIF.prototype.getArgTypesPointer    = function() { return this._argtypesptr; }
FFI.CIF.prototype.getReturnTypePointer  = function() { return this._rtypeptr; }
FFI.CIF.prototype.getPointer            = function() { return this._cifptr; }

FFI.ForeignFunction = function(ptr, returnType, types, async) {
    this._returnType    = returnType;
    this._types         = types;
    this._fptr          = ptr;
    this._async         = async;
    
    // allocate storage areas
    this._resultPtr     = new FFI.Pointer(FFI.Bindings.TYPE_SIZE_MAP[this._returnType]);    
    this._paramPtrs     = [];
    this._strParamPtrs  = {};

    this._arglistPtr    = new FFI.Pointer(types.length * FFI.Bindings.POINTER_SIZE);
    
    var cptr = this._arglistPtr.seek(0);
    
    // allocate a storage area for each argument, then write the pointer to the argument list
    for (var i = 0, len = types.length; i < len; i++) {
        var pptr = new FFI.Pointer(FFI.Bindings.TYPE_SIZE_MAP[types[i]]);
        cptr.putPointer(pptr, true);
        this._paramPtrs.push(pptr);
        
        // if it's a string, we have to allocate a secondary buffer
        if (types[i] == "string") {
            this._strParamPtrs[i] = new FFI.Pointer(1024);
            pptr.putPointer(this._strParamPtrs[i]);
        }
    }
    
    this._cif = new FFI.CIF(returnType, types);
    this._initializeProxy();
};

FFI.ForeignFunction.prototype._initializeProxy = function() {
    var self        = this;
    var cifptr      = this._cif.getPointer();
    
    this._proxy = function() {
        var async   = self._async;
        var ptr     = self._cif.getPointer();
        
        if (arguments.length != self._types.length)
            throw new Error("Function arguments did not meet specification.");
        
        // write arguments to storage areas
        for (var i = 0, len = arguments.length; i < len; i++) {
            var t = self._types[i];
            var v = arguments[i];
            
            if (v == null) {
                self._paramPtrs[i].putPointer(FFI.NULL_POINTER);
            }
            else {
                // if it's a string, we have to write it to our secondary buffers    
                if (t == "string") {
                    // if our incoming string is larger than our allocation area, increase
                    // the size of our allocation area
                    if ((v.length + 1) > self._strParamPtrs[i].allocated) {
                        var newptr = new FFI.Pointer(v.length + 1);
                        self._strParamPtrs[i] = newptr;
                        self._paramPtrs[i].putPointer(newptr);
                    }
            
                    self._strParamPtrs[i].putCString(v);
                    self._paramPtrs[i].putPointer(self._strParamPtrs[i]);    
                }
                else {
                    FFI_POINTER_PUT_DISPATCH_TABLE[t].apply(self._paramPtrs[i], [v]);
                }
            }
        }
        
        var r = FFI.Bindings.call(cifptr, self._fptr, self._arglistPtr, self._resultPtr, async);
        
        if (async) {
            var emitter = new events.EventEmitter();
            
            r.on("success", function() {
                emitter.emit("success", FFI.derefValuePtr(self._returnType, self._resultPtr));
            });
            
            return emitter;
        }
        
        return self._returnType == "void" ? null : FFI.derefValuePtr(self._returnType, self._resultPtr);
    };
};

FFI.ForeignFunction.prototype.getFunction = function() {
    return this._proxy;
};

FFI.ForeignFunction.build = function(ptr, returnType, types, async) {
    var ff = new FFI.ForeignFunction(ptr, returnType, types, async);
    return ff.getFunction();
};

// TODO: deprecated?
FFI.allocValue = function(type, val) {
    if (!isValidParamType(type)) throw new Error("Invalid Type: " + type);
    
    if (val == null)
        return FFI.NULL_POINTER_PARAM;
        
    var ptr = new FFI.Pointer(type == "string" ? val.length + 1 : FFI.Bindings.TYPE_SIZE_MAP[type]);
    ptr["put" + FFI.TYPE_TO_POINTER_METHOD_MAP[type]](val);
    
    if (type == "string") {
        // we have to actually build an "in-between" pointer for strings
        var dptr = new FFI.Pointer(FFI.Bindings.TYPE_SIZE_MAP["pointer"]);
        ptr.attach(dptr); // save it from garbage collection
        dptr.putPointer(ptr);
        return dptr;
    }
    else {
        return ptr;
    }
};

FFI.derefValuePtr = function(type, ptr) {
    if (!isValidParamType(type)) throw new Error("Invalid Type: " + type);
    
    var dptr = ptr;
    
    if (type == "string") {
        dptr = ptr.getPointer();
        if (dptr.isNull()) {
            return null;
        }
    }
    
    return FFI_POINTER_GET_DISPATCH_TABLE[type].apply(dptr);
};

// From <dlfcn.h> on Darwin: #define RTLD_DEFAULT    ((void *) -2)
FFI.DARWIN_RTLD_DEFAULT = FFI.NULL_POINTER.seek(-2);

FFI.DynamicLibrary = function(path, mode) {
    if (path == null && process.platform == "darwin") {
        this._handle    = FFI.DARWIN_RTLD_DEFAULT;
        this.close      = function() { }; // neuter close
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

FFI.DynamicLibrary.prototype._dlopen = FFI.ForeignFunction.build(
    FFI.StaticFunctions.dlopen,
    "pointer",
    [ "string", "int32" ]
);

FFI.DynamicLibrary.prototype._dlclose = FFI.ForeignFunction.build(
    FFI.StaticFunctions.dlclose,
    "int32",
    [ "pointer" ]
);

FFI.DynamicLibrary.prototype._dlsym = FFI.ForeignFunction.build(
    FFI.StaticFunctions.dlsym,
    "pointer",
    [ "pointer", "string" ]
);

FFI.DynamicLibrary.prototype._dlerror = FFI.ForeignFunction.build(
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
        
        var resultType  = funcs[k][0],
            paramTypes  = funcs[k][1],
            fopts       = funcs[k][2];
        
        this[k] = FFI.ForeignFunction.build(fptr, resultType, paramTypes, fopts ? fopts.async : undefined);
    }
};

/////////////////////

FFI.Callback = function(typedata, func) {
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

FFI.Callback.prototype.getPointer = function() {
    return this._pointer;
};

// Export Everything
for (var k in FFI) { exports[k] = FFI[k]; }

}());