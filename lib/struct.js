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

    function read(ptr, name) {
        var info = struct.struct[name];
        var fptr = ptr.seek(info.offset);

        if (FFI.isStructType(info.type)) {
            return new info.type(fptr);
        } else if (info.type == 'string') {
            return fptr.getPointer().getCString()
        } else {
            return fptr["get" + FFI.TYPE_TO_POINTER_METHOD_MAP[info.type]]();
        }
    }

    function write(ptr, name, val) {
        var info = struct.struct[name];
        var fptr = ptr.seek(info.offset);

        if (FFI.isStructType(info.type)) {
            new info.type(fptr, val);
        } else if (info.type == 'string') {
            if (typeof val == 'undefined' || val === null) return fptr.putPointer(FFI.Pointer.NULL);
            var len = Buffer.byteLength(val, 'utf8');
            var strPtr = new FFI.Pointer(len+1);
            strPtr.putCString(val);
            fptr.putPointer(strPtr);
        } else {
            return fptr["put" + FFI.TYPE_TO_POINTER_METHOD_MAP[info.type]](val);
        }
    }

    // TODO: Allow serialize/deserialize to accept struct instances?
    function serialize(ptr, data) {
        for (var key in data) {
            write(ptr, key, data[key]);
        }
    }

    // TODO: Not used?
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
            var field   = fields[i]
              , type    = field[0]
              , name    = field[1]
            //console.log(name)

            if (name in struct.struct) {
                throw new Error("Error when constructing Struct: " + name + " field specified twice!");
            }

            var stype   = FFI.isStructType(type)
              , sz      = stype ? type.__structInfo__.size : FFI.Bindings.TYPE_SIZE_MAP[type]
              , asz     = stype ? type.__structInfo__.alignment : sz
            //console.log('  size:',sz)
            //console.log('  offset:', struct.size)
            //console.log('  asz:',asz)

            struct.alignment  = Math.max(struct.alignment, asz);
            var left = struct.size % struct.alignment
            var offset = struct.size
            if (sz > left) offset += left

            struct.size      = offset + sz

            struct.struct[name] = { "name": name, "type": type, "size": sz, "offset": offset };
            struct.members.push(name);
        }
        //console.log('before left:', struct.size, struct.alignment)
        var left = struct.size % struct.alignment
        if (left)
          struct.size += (struct.alignment - left)
        //console.log('after left:', struct.size)
    }

    var constructor = function(arg, data) {
        this.__isStructInstance__   = true;
        this.__structInfo__         = struct;

        if (arg instanceof FFI.Pointer) {
            this.__pointer = arg;

            if (data) {
                serialize(this.__pointer, data);
            }
        }
        else {
            this.__pointer = new FFI.Pointer(struct.size);

            if (arg) {
                serialize(this.__pointer, arg);
            }
        }

        this.__wrappedPointer__     = this.__pointer;

        // Convienience function to return the pointer to this Struct instance
        this.ref = function ref () {
            return this.__wrappedPointer__;
        }
    };

    // Function to return an `ffi_type` struct instance from this struct
    constructor._ffiType = function ffiType () {
      // return cached if available
      if (this._ffiTypeCached) return this._ffiTypeCached;
      var t = new FFI.FFI_TYPE()
      t.size = 0
      t.alignment = 0
      t.type = 13 // FFI_TYPE_STRUCT
      var props = this.__structInfo__.struct
        , propNames = Object.keys(props)
        , numProps = propNames.length
        , elements = new FFI.Pointer(FFI.Bindings.POINTER_SIZE * (numProps+1))
        , tptr = elements.seek(0)
      for (var i=0; i<numProps; i++) {
        var prop = props[propNames[i]]
        tptr.putPointer(FFI.ffiTypeFor(prop.type), true)
      }
      tptr.putPointer(FFI.Pointer.NULL)
      t.elements = elements
      return this._ffiTypeCached = t
    }

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
