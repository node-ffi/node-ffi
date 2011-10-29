var FFI = require("./ffi");

// Pointer represents data stored in
var Pointer = module.exports = FFI.Bindings.Pointer;

// attach is used for tracking dependencies among pointers to prevent garbage collection
Pointer.prototype.attach = function(friend) {
    if (friend.__attached == undefined)
        friend.__attached = [];

    friend.__attached.push(this);
};

// This wraps _putPointer so it supports direct struct writing
Pointer.prototype.putPointer = function(ptr, seek) {
    return this._putPointer(
        (ptr != null && "__wrappedPointer__" in ptr) ? ptr.__wrappedPointer__ : ptr,
        seek
    );
};

// Allocates a pointer big enough to fit *typeDef* and *value*, writes the value, and returns it
Pointer.alloc = function(typeDef, value) {
    var ptr = new Pointer((typeDef == "string") ? value.length + 1 : FFI.sizeOf(typeDef));

    Pointer.putDispatchTable[typeDef].apply(ptr, [value]);

    if (typeDef == "string") {
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

// Returns the "method" call suffix (e.g. "Int8") for a type
Pointer.methodCallSuffixForType = function(typeDef) {
        var mapped = FFI.TYPE_TO_POINTER_METHOD_MAP[typeDef];

        if (mapped) {
            // it's hard mapped
            return mapped;
        }
        else {
            // no hard mapping, so try to use size
            var sz      = FFI.sizeOf(typeDef),
                szMap   = FFI.SIZE_TO_POINTER_METHOD_MAP[sz],
                signed  = (typeDef != "byte" && typeDef != "size_t" && typeDef.substr(0, 1) != "u");

            if (sz) {
                // XXX: This is kind of a shitty way to detect unsigned/signed
                return signed ? szMap : "U" + szMap;
            }
            else {
                throw new Error("Pointer.methodCallSuffixForType: Could not map " + typeDef + " to anything.");
            }
        }
};

// Appends the "FFI.NON_SPECIFIC_TYPES" to the TYPE_TO_POINTER_METHOD_MAP by discovering the method
// suffix by type size.
for (var typeName in FFI.NON_SPECIFIC_TYPES) {
    var method  = FFI.NON_SPECIFIC_TYPES[typeName],
        suffix  = Pointer.methodCallSuffixForType(typeName);

    FFI.TYPE_TO_POINTER_METHOD_MAP[typeName] = suffix;

    Pointer.prototype["put" + method] = Pointer.prototype["put" + suffix];
    Pointer.prototype["get" + method] = Pointer.prototype["get" + suffix];
}

// create fast dispatch tables for type calls
Pointer.putDispatchTable = {};
Pointer.getDispatchTable = {};

for (var type in FFI.TYPE_TO_POINTER_METHOD_MAP) {
    Pointer.putDispatchTable[type] =
        Pointer.prototype["put" + FFI.TYPE_TO_POINTER_METHOD_MAP[type]];
    Pointer.getDispatchTable[type] =
        Pointer.prototype["get" + FFI.TYPE_TO_POINTER_METHOD_MAP[type]];
}

Pointer.NULL        = new Pointer(0);
Pointer.NULL_PARAM  = new Pointer(FFI.Bindings.POINTER_SIZE);
Pointer.NULL_PARAM.putPointer(Pointer.NULL);
