var FFI = require("./ffi");

// An interface for modeling and instantiating C-style data structures. This is not a constructor
// per-say, but a constructor generator. It takes an array of tuples, the left side being the type,
// and the right side being a field name. The order should be the same order it would appear in the
// C-style struct definition. It returns a function that can be used to construct an object that
// reads and writes to the data structure using properties specified by the initial field list.
//
// Example:
//
//      var PasswordEntry = FFI.Struct([["string", "username"], ["string", "password"]]);
//      var pwd = new PasswordEntry();
//      pwd.username = "rdahl";
//      pwd.password = "isecretelyhatenode.js";
//
var Struct = module.exports = function(fields) {
    var struct = {};
    
    struct.struct    = {};
    struct.members   = [];
    struct.size      = 0;
    struct.alignment = 0;

    // TODO: Allow nested struct types, which will require a bit of refactoring.
    
    function read(ptr, name) {
        var info = struct.struct[name];
        var fptr = ptr.seek(info.offset);
        return fptr["get" + FFI.TYPE_TO_POINTER_METHOD_MAP[info.type]]();
    }
    
    function write(ptr, name, val) {
        var info = struct.struct[name];
        var fptr = ptr.seek(info.offset);
        return fptr["put" + FFI.TYPE_TO_POINTER_METHOD_MAP[info.type]](val);
    }
    
    function serialize(ptr, data) {
        for (var i = 0, len = struct.members.length; i < len; i++) {
            var name = struct.members[i];
            write(ptr, name, data[name]);
        }
    }
    
    function deserialize(ptr) {
        var data = {};

        for (var i = 0, len = struct.members.length; i < len; i++) {
            var name = struct.members[i];
            data[name] = read(ptr, name);
        }

        return data;
    }
    
    // Read the fields list and apply all the fields to the struct
    if (fields) {
        for (var i = 0, len = fields.length; i < len; i++) {
            var field   = fields[i],
                type    = field[0],
                name    = field[1];
                
            if (name in struct.struct) {
                throw new Error("Error when constructing Struct: " + name + " field specified twice!");
            }
            else {
               var sz      = FFI.Bindings.TYPE_SIZE_MAP[type],
                   offset  = struct.size;

                struct.size      += sz;
                struct.alignment  = Math.max(struct.alignment, sz);
                struct.size      += Math.abs(struct.alignment - sz);

                struct.struct[name] = { "name": name, "type": type, "size": sz, "offset": offset };
                struct.members.push(name);
            }
        }
    }
    
    var constructor = function(arg) {
        this.__isStructInstance__   = true;
        this.__structInfo__         = struct;

        if (arg instanceof FFI.Pointer) {
            this.__pointer = arg;
        }
        else {
            this.__pointer = new FFI.Pointer(struct.size);
            
            if (arg != null) {
                serialize(this.__pointer, arg);
            }
        }
        
        this.__wrappedPointer__     = this.__pointer;
    };
    
    // Add getters & setters for each field to the constructor's prototype
    for (var i = 0, len = struct.members.length; i < len; i++) {
        var fieldName = struct.members[i];
        
        (function(field) {
            constructor.prototype.__defineGetter__(fieldName, function () {
                return read(this.__pointer, field);
            });

            constructor.prototype.__defineSetter__(fieldName, function (val) {
                write(this.__pointer, field, val);
            });
        })(fieldName);
    }
    
    constructor.__isStructType__    = true;
    constructor.__structInfo__      = struct;

    return constructor;
}