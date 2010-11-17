var util = require("util");

var assert  = require("assert"),
    FFI     = require("../lib/ffi"),
    rss     = process.memoryUsage()["rss"];

var Pointer = FFI.Pointer;

/////////

var ptr = new Pointer(1024);

assert.ok(ptr.address > 0);

var ptr2 = ptr.seek(32);
assert.equal(ptr.address + 32, ptr2.address);

ptr.attach(ptr2);
assert.equal(ptr.address, ptr2.__attached[0].address);

////////////////

ptr.putUInt8(128);
assert.equal(128, ptr.getUInt8());

assert.throws(function() { ptr.putUInt8(1024); });

ptr.putInt8(-10);
assert.equal(-10, ptr.getInt8());

assert.throws(function() { ptr.putInt8(-150); });

ptr.putInt16(-1024);
assert.equal(-1024, ptr.getInt16());

ptr.putUInt16(1024);
assert.equal(1024, ptr.getUInt16());

ptr.putInt32(1024 * 1024);
assert.equal(1024 * 1024, ptr.getInt32());

ptr.putUInt32(1024 * 1024);
assert.equal(1024 * 1024, ptr.getUInt32());

ptr.putInt64(0 - (1024 * 1024 * 1024 * 1024));
assert.equal(0 - (1024 * 1024 * 1024 * 1024), ptr.getInt64());

ptr.putUInt64(1024 * 1024 * 1024 * 1024);
assert.equal(1024 * 1024 * 1024 * 1024, ptr.getUInt64());

// TODO: values outside of "float" precision create unpredictable results
ptr.putFloat(1.5);
assert.equal(1.5, ptr.getFloat());

ptr.putDouble(1000.005);
assert.equal(1000.005, ptr.getDouble());

var nptr = new Pointer(32);
nptr.putDouble(1234.5678);
ptr.putPointer(nptr);

assert.equal(nptr.address, ptr.getPointer().address);
assert.equal(1234.5678, ptr.getPointer().getDouble());
assert.equal(32, nptr.allocated);

ptr.putCString("Hello World!");
assert.equal("Hello World!", ptr.getCString());

////////////////////////

// Light exercise the "non-specific" getters/putters

ptr.putByte(6);
assert.equal(6, ptr.getByte());

ptr.putChar(6);
assert.equal(6, ptr.getChar());

ptr.putUChar(8);
assert.equal(8, ptr.getUChar());

ptr.putShort(9);
assert.equal(9, ptr.getShort());

ptr.putUShort(11);
assert.equal(11, ptr.getUShort());

ptr.putInt(12);
assert.equal(12, ptr.getInt());

ptr.putUInt(13);
assert.equal(13, ptr.getUInt());

ptr.putLong(14);
assert.equal(14, ptr.getLong());

ptr.putULong(15);
assert.equal(15, ptr.getULong());

ptr.putLongLong(16);
assert.equal(16, ptr.getLongLong());

ptr.putULongLong(17);
assert.equal(17, ptr.getULongLong());

ptr.putSizeT(18);
assert.equal(18, ptr.getSizeT());

//////////////////////

var nullptr = new Pointer(0);
assert.ok(nullptr.isNull());

// test put + advance calls
var advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putByte(1, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putInt8(1, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putInt16(1, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putUInt16(1, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putInt32(1, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putUInt32(1, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putInt64(1, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putUInt64(1, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putFloat(1, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putDouble(1, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putPointer(ptr, true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.putCString("hi", true);
assert.ok(advptr.address > ptr.address);

// test get + advance calls

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getByte(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getInt8(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getInt16(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getUInt16(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getInt32(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getUInt32(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getInt64(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getUInt64(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getFloat(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getDouble(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getPointer(true);
assert.ok(advptr.address > ptr.address);

advptr = ptr.seek(0);
assert.ok(advptr.address == ptr.address);
advptr.getCString(true);
assert.ok(advptr.address > ptr.address);

//////////////////////

assert.ok(FFI.Bindings.StaticFunctions instanceof Object);
assert.ok(FFI.Bindings.StaticFunctions.dlopen instanceof Pointer);
assert.ok(FFI.Bindings.StaticFunctions.dlclose instanceof Pointer);
assert.ok(FFI.Bindings.StaticFunctions.dlsym instanceof Pointer);
assert.ok(FFI.Bindings.StaticFunctions.dlerror instanceof Pointer);

//////////////////////

var SimpleStruct = new FFI.Struct([
    ["byte", "first"],
    ["byte", "last"]
]);

var stInstance = new SimpleStruct();

stInstance.first = 50;
stInstance.last  = 100;

assert.equal(50,    stInstance.first);
assert.equal(100,   stInstance.last);

var MegaStruct = new FFI.Struct([
    ["byte", "byteVal"],
    ["int8", "int8Val"],
    ["int16", "int16Val"],
    ["uint16", "uint16Val"],
    ["int32", "int32Val"],
    ["uint32", "uint32Val"],
    ["float", "floatVal"],
    ["double", "doubleVal"],
    ["pointer", "pointerVal"]
]);

var msTestPtr = new Pointer(4);

var msInstance = new MegaStruct({
   "byteVal": 100,
   "int8Val": -100,
   "int16Val": -1000,
   "uint16Val": 1000,
   "int32Val": -10000,
   "uint32Val": 10000,
   "floatVal": 1.25,
   "doubleVal": 1000.0005,
   "pointerVal": msTestPtr
});

assert.equal(100,               msInstance.byteVal);
assert.equal(-100,              msInstance.int8Val);
assert.equal(1000,              msInstance.uint16Val);
assert.equal(-1000,             msInstance.int16Val);
assert.equal(10000,             msInstance.uint32Val);
assert.equal(-10000,            msInstance.int32Val);
assert.equal(1.25,              msInstance.floatVal);
assert.equal(1000.0005,         msInstance.doubleVal);
assert.equal(msTestPtr.address, msInstance.pointerVal.address);

assert.throws(function() {
    FFI.Struct([
        ["byte", "a"],
        ["byte", "a"]
    ]);
}, Error, "Error when constructing Struct: a field specified twice!");

//////////////////////
assert.ok(FFI.Bindings.FFI_TYPES["void"] instanceof FFI.Pointer);
assert.ok(FFI.Bindings.FFI_TYPES["int8"] instanceof FFI.Pointer);

//////////////////////

var tcif = new FFI.CIF("int32", ["int32"]);
assert.ok(tcif.getArgTypesPointer() instanceof FFI.Pointer);
var cifat = tcif.getArgTypesPointer().seek(0);
assert.equal(FFI.Bindings.FFI_TYPES["int32"].address, cifat.getPointer(true).address);

////////////////////////

var ff = new FFI.ForeignFunction(FFI.Bindings.StaticFunctions.abs, "int32", [ "int32" ]);
var absFunc = ff.getFunction();
assert.ok(absFunc instanceof Function);
assert.equal(1234, absFunc(-1234));

//////////////////////
 
var builtValuePtr = FFI.Pointer.alloc("int32", 1234);
assert.equal(1234, builtValuePtr.getInt32());
assert.equal(1234, FFI.derefValuePtr("int32", builtValuePtr));

var builtStringPtr = FFI.Pointer.alloc("string", "Hello World!");

assert.equal("Hello World!", FFI.derefValuePtr("string", builtStringPtr));

//////////////////////

var abs = FFI.ForeignFunction.build(FFI.Bindings.StaticFunctions.abs, "int32", [ "int32" ]);
assert.equal(1234, abs(-1234));

var atoi = FFI.ForeignFunction.build(FFI.Bindings.StaticFunctions.atoi, "int32", [ "string" ]);
assert.equal(1234, atoi("1234"));

//////////////////////

var libm = new FFI.DynamicLibrary("libm" + FFI.PLATFORM_LIBRARY_EXTENSIONS[process.platform], FFI.DynamicLibrary.FLAGS.RTLD_NOW);
assert.ok(libm instanceof FFI.DynamicLibrary);

var ceilPtr = libm.get("ceil");
assert.ok(ceilPtr instanceof FFI.Pointer);
assert.ok(!ceilPtr.isNull());

var ceil = FFI.ForeignFunction.build(ceilPtr, "double", [ "double" ]);
assert.ok(ceil instanceof Function);
 
assert.equal(2, ceil(1.5));
 
libm.close();

///////////////////////

var libm = new FFI.Library("libm", { "ceil": [ "double", [ "double" ] ] });
assert.ok(libm instanceof FFI.Library);
assert.ok(libm.ceil instanceof Function);
assert.equal(2, libm.ceil(1.5));

///////////////////////

var thisfuncs = new FFI.Library(null, {
    "fopen": [ "pointer", [ "string", "string" ] ],
    "fclose": [ "int32", [ "pointer" ] ]
});

assert.ok(thisfuncs instanceof FFI.Library);

var fd = thisfuncs.fopen("/etc/passwd", "r");
assert.ok(!fd.isNull());

assert.equal(0, thisfuncs.fclose(fd));


///////////////////////

var closureCalled = 0;
var cifPtr = new FFI.CIF("int32", [ "int32" ]);
var clz = new FFI.CallbackInfo(cifPtr.getPointer(), function(result, args) {
    closureCalled++;
});

var callMyTestClosure = FFI.ForeignFunction.build(clz.pointer, "int32", [ "int32" ]);
callMyTestClosure(1);
assert.equal(1, closureCalled);
callMyTestClosure(1);
assert.equal(2, closureCalled);

///////////////////////

var callback = new FFI.Callback(["int32", ["int32"]], function(inValue) {
   return Math.abs(inValue);
});

var callMyTestCallback = FFI.ForeignFunction.build(callback.getPointer(), "int32", ["int32"]);

// force a garbage collection for --gc_interval=10
var gcTestObj = {};
for (var i = 0; i < 25; i++) {
    gcTestObj[i] = {i: gcTestObj, s: ""};
}

assert.equal(1234, callMyTestCallback(-1234));

///////////////////////

var asyncAbsCallExecuted = false;
var asyncAbs = FFI.ForeignFunction.build(FFI.Bindings.StaticFunctions.abs, "int32", [ "int32" ], true);
asyncAbs(-1234).on("success", function (res) {
    asyncAbsCallExecuted = true;
    assert.equal(1234, res);
});

var libmCeilAsyncCallExecuted = false;
var libm = new FFI.Library("libm", { "ceil": [ "double", [ "double" ], {"async": true } ] });
assert.ok(libm instanceof FFI.Library);
assert.ok(libm.ceil instanceof Function);

libm.ceil(1.5).on("success", function(res) { 
    libmCeilAsyncCallExecuted = true;
    assert.equal(2, res);
});

///////////////////////

assert.equal(2, FFI.errno());

///////////////////////

// allow the event loop to complete
setTimeout(function() {
    assert.ok(asyncAbsCallExecuted);
    assert.ok(libmCeilAsyncCallExecuted);
    util.log("Tests pass!");
}, 250);

///////////////////////

// test gettimeofday() with FFI.Struct
(function() {
    var timeval = FFI.Struct([
        ["long", "tv_sec"],
        ["long", "tv_usec"]
    ]);
    
    var lib = new FFI.Library(null, { "gettimeofday": [ "int", [ timeval, "pointer"] ] });
    
    var tv = new timeval();
    lib.gettimeofday(tv, null);
    
    assert.equal(tv.tv_sec, Math.floor(Date.now() / 1000));
})();

// Test FFI.Struct nesting
(function() {
    var ChildStructType = FFI.Struct([
        ["int", "a"],
        ["int", "b"]
    ]);
    
    var ParentStructType = FFI.Struct([
        [ChildStructType, "childA"],
        [ChildStructType, "childB"]
    ]);
    
    var ps = new ParentStructType({
        "childA": { "a": 100, "b": 200 },
        "childB": { "a": 300, "b": 400 }
    });
    
    assert.equal(100, ps.childA.a);
    assert.equal(200, ps.childA.b);
    assert.equal(300, ps.childB.a);
    assert.equal(400, ps.childB.b);
})();

///////////////////////

util.log("Heap increased by " + ((process.memoryUsage()["rss"] - rss) / 1024) + " KB");
