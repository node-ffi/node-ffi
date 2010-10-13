var assert = require("assert"),
    FFI   = require("./node-ffi"),
    sys   = require("sys"),
    rss   = process.memoryUsage()["rss"];

var Pointer = FFI.Pointer;

/////////

var ptr = new Pointer(1024);
assert.ok(ptr.address > 0);

var ptr2 = ptr.seek(32);
assert.equal(ptr.address + 32, ptr2.address);

ptr.attach(ptr2);
assert.equal(ptr.address, ptr2.__attached[0].address);

ptr.putByte(128);
assert.equal(128, ptr.getByte());

assert.throws(function() { ptr.putByte(1024); });

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

assert.ok(FFI.StaticFunctions instanceof Object);
assert.ok(FFI.StaticFunctions.dlopen instanceof Pointer);
assert.ok(FFI.StaticFunctions.dlclose instanceof Pointer);
assert.ok(FFI.StaticFunctions.dlsym instanceof Pointer);
assert.ok(FFI.StaticFunctions.dlerror instanceof Pointer);

//////////////////////

var testStruct = new FFI.StructType([["byte", "a"], ["byte", "b"]]);
var stptr = testStruct.allocate({"a": 100, "b": 200});

assert.equal(100, stptr.getByte(true));
assert.equal(200, stptr.getByte(true));

var allStruct = new FFI.StructType([
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
var allStruct_testPtr = new Pointer(4);
var allptr = allStruct.allocate({
   "byteVal": 100,
   "int8Val": -100,
   "int16Val": -1000,
   "uint16Val": 1000,
   "int32Val": -10000,
   "uint32Val": 10000,
   "floatVal": 1.25,
   "doubleVal": 1000.0005,
   "pointerVal": allStruct_testPtr
});

assert.equal(100, allStruct.readField(allptr, "byteVal"));
assert.equal(-100, allStruct.readField(allptr, "int8Val"));
assert.equal(-1000, allStruct.readField(allptr, "int16Val"));
assert.equal(1000, allStruct.readField(allptr, "uint16Val"));
assert.equal(-10000, allStruct.readField(allptr, "int32Val"));
assert.equal(10000, allStruct.readField(allptr, "uint32Val"));
assert.equal(1.25, allStruct.readField(allptr, "floatVal"));
assert.equal(1000.0005, allStruct.readField(allptr, "doubleVal"));
assert.equal(allStruct_testPtr.address, allStruct.readField(allptr, "pointerVal").address);

//////////////////////
assert.ok(FFI.Bindings.FFI_TYPES["void"] instanceof FFI.Pointer);
assert.ok(FFI.Bindings.FFI_TYPES["int8"] instanceof FFI.Pointer);

//////////////////////

var tcif = new FFI.CIF("int32", ["int32"]);
assert.ok(tcif.getArgTypesPointer() instanceof FFI.Pointer);
var cifat = tcif.getArgTypesPointer().seek(0);
assert.equal(FFI.Bindings.FFI_TYPES["int32"].address, cifat.getPointer(true).address);

////////////////////////

var ff = new FFI.ForeignFunction(FFI.StaticFunctions.abs, "int32", [ "int32" ]);
var absFunc = ff.getFunction();
assert.ok(absFunc instanceof Function);
assert.equal(1234, absFunc(-1234));

//////////////////////
 
var builtValuePtr = FFI.allocValue("int32", 1234);
assert.equal(1234, builtValuePtr.getInt32());
assert.equal(1234, FFI.derefValuePtr("int32", builtValuePtr));

var builtStringPtr = FFI.allocValue("string", "Hello World!");
assert.equal("Hello World!", FFI.derefValuePtr("string", builtStringPtr));

//////////////////////

var abs = FFI.ForeignFunction.build(FFI.StaticFunctions.abs, "int32", [ "int32" ]);
assert.equal(1234, abs(-1234));

var atoi = FFI.ForeignFunction.build(FFI.StaticFunctions.atoi, "int32", [ "string" ]);
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
callMyTestClosure(1);
assert.equal(2, closureCalled);

///////////////////////

var asyncClosureCalled = 0;
var cifPtr = new FFI.CIF("int32", [ "int32" ]);
var clz = new FFI.CallbackInfo(cifPtr.getPointer(), function(result, args) {
    asyncClosureCalled++;
    result.putInt32(1234);
});


var callMyTestClosure = FFI.ForeignFunction.build(clz.pointer, "int32", [ "int32" ], true);

callMyTestClosure(1).on("success", function(res) {
   assert.equal(1234, res);
});

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

var asyncAbs = FFI.ForeignFunction.build(FFI.StaticFunctions.abs, "int32", [ "int32" ], true);
asyncAbs(-1234).on("success", function (res) {
    assert.equal(1234, res);
});

var libm = new FFI.Library("libm", { "ceil": [ "double", [ "double" ], {"async": true } ] });
assert.ok(libm instanceof FFI.Library);
assert.ok(libm.ceil instanceof Function);
libm.ceil(1.5).on("success", function(res) { assert.equal(2, res); });

var sleeplib = new FFI.Library(null, { "sleep": [ "uint32", [ "uint32" ], {"async": true } ] });
sleeplib.sleep(1);

///////////////////////
///////////////////////

// allow the event loop to complete
setTimeout(function() {
    assert.equal(1, asyncClosureCalled);
    sys.puts("Tests pass!");
}, 2000);

sys.puts("Heap increased by " + ((process.memoryUsage()["rss"] - rss) / 1024) + " KB");
