process.mixin(require("mjsunit"));

var FFI = require("./ffi");
var sys = require("sys");
var rss = process.memoryUsage()["rss"];

var Pointer = FFI.Pointer;

/////////

var ptr = new Pointer(1024);
assertTrue(ptr.address > 0);

var ptr2 = ptr.seek(32);
assertEquals(ptr.address + 32, ptr2.address);

ptr.attach(ptr2);
assertEquals([ptr], ptr2.__attached);

ptr.putByte(128);
assertEquals(128, ptr.getByte());

assertThrows("ptr.putByte(1024)");

ptr.putInt8(-10);
assertEquals(-10, ptr.getInt8());

assertThrows("ptr.putInt8(-150)");

ptr.putInt16(-1024);
assertEquals(-1024, ptr.getInt16());

ptr.putUInt16(1024);
assertEquals(1024, ptr.getUInt16());

ptr.putInt32(1024 * 1024);
assertEquals(1024 * 1024, ptr.getInt32());

ptr.putUInt32(1024 * 1024);
assertEquals(1024 * 1024, ptr.getUInt32());

// TODO: values outside of "float" precision create unpredictable results
ptr.putFloat(1.5);
assertEquals(1.5, ptr.getFloat());

ptr.putDouble(1000.005);
assertEquals(1000.005, ptr.getDouble());

var nptr = new Pointer(32);
nptr.putDouble(1234.5678);
ptr.putPointer(nptr);
assertEquals(nptr.address, ptr.getPointer().address);
assertEquals(1234.5678, ptr.getPointer().getDouble());
assertEquals(32, nptr.allocated);

ptr.putCString("Hello World!");
assertEquals("Hello World!", ptr.getCString());

//////////////////////

var nullptr = new Pointer(0);
assertTrue(nullptr.isNull());

// test put + advance calls
var advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putByte(1, true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putInt8(1, true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putInt16(1, true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putUInt16(1, true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putInt32(1, true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putUInt32(1, true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putFloat(1, true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putDouble(1, true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putPointer(ptr, true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putCString("hi", true);
assertTrue(advptr.address > ptr.address);

// test get + advance calls

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getByte(true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getInt8(true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getInt16(true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getUInt16(true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getInt32(true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getUInt32(true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getFloat(true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getDouble(true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getPointer(true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getCString(true);
assertTrue(advptr.address > ptr.address);

//////////////////////

assertInstanceof(FFI.StaticFunctions, Object);
assertInstanceof(FFI.StaticFunctions.dlopen, Pointer);
assertInstanceof(FFI.StaticFunctions.dlclose, Pointer);
assertInstanceof(FFI.StaticFunctions.dlsym, Pointer);
assertInstanceof(FFI.StaticFunctions.dlerror, Pointer);

//////////////////////

var testStruct = new FFI.StructType([["byte", "a"], ["byte", "b"]]);
var stptr = testStruct.allocate({"a": 100, "b": 200});

assertEquals(100, stptr.getByte(true));
assertEquals(200, stptr.getByte(true));

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

assertEquals(100, allStruct.readField(allptr, "byteVal"));
assertEquals(-100, allStruct.readField(allptr, "int8Val"));
assertEquals(-1000, allStruct.readField(allptr, "int16Val"));
assertEquals(1000, allStruct.readField(allptr, "uint16Val"));
assertEquals(-10000, allStruct.readField(allptr, "int32Val"));
assertEquals(10000, allStruct.readField(allptr, "uint32Val"));
assertEquals(1.25, allStruct.readField(allptr, "floatVal"));
assertEquals(1000.0005, allStruct.readField(allptr, "doubleVal"));
assertEquals(allStruct_testPtr.address, allStruct.readField(allptr, "pointerVal").address);

//////////////////////
assertInstanceof(FFI.Bindings.FFI_TYPES["void"], FFI.Pointer);
assertInstanceof(FFI.Bindings.FFI_TYPES["int8"], FFI.Pointer);

//////////////////////

var tcif = new FFI.CIF("int32", ["int32"]);
assertInstanceof(tcif.getArgTypesPointer(), FFI.Pointer);
var cifat = tcif.getArgTypesPointer().seek(0);
assertEquals(FFI.Bindings.FFI_TYPES["int32"].address, cifat.getPointer(true).address);

////////////////////////

var ff = new FFI.ForeignFunction(FFI.StaticFunctions.abs, "int32", [ "int32" ]);
var absFunc = ff.getFunction();
assertInstanceof(absFunc, Function);
assertEquals(1234, absFunc(-1234));

//////////////////////
 
var builtValuePtr = FFI.allocValue("int32", 1234);
assertEquals(1234, builtValuePtr.getInt32());
assertEquals(1234, FFI.derefValuePtr("int32", builtValuePtr));

var builtStringPtr = FFI.allocValue("string", "Hello World!");
assertEquals("Hello World!", FFI.derefValuePtr("string", builtStringPtr));

//////////////////////

var abs = FFI.ForeignFunction.build(FFI.StaticFunctions.abs, "int32", [ "int32" ]);
assertEquals(1234, abs(-1234));

var atoi = FFI.ForeignFunction.build(FFI.StaticFunctions.atoi, "int32", [ "string" ]);
assertEquals(1234, atoi("1234"));

//////////////////////

var libm = new FFI.DynamicLibrary("libm" + FFI.PLATFORM_LIBRARY_EXTENSIONS[process.platform], FFI.DynamicLibrary.FLAGS.RTLD_NOW);
assertInstanceof(libm, FFI.DynamicLibrary);

var ceilPtr = libm.get("ceil");
assertInstanceof(ceilPtr, FFI.Pointer);
assertFalse(ceilPtr.isNull());

var ceil = FFI.ForeignFunction.build(ceilPtr, "double", [ "double" ]);
assertInstanceof(ceil, Function);
 
assertEquals(2, ceil(1.5));
 
libm.close();

///////////////////////

var libm = new FFI.Library("libm", { "ceil": [ "double", [ "double" ] ] });
assertInstanceof(libm, FFI.Library);
assertInstanceof(libm.ceil, Function);
assertEquals(2, libm.ceil(1.5));

///////////////////////

var thisfuncs = new FFI.Library(null, {
    "fopen": [ "pointer", [ "string", "string" ] ],
    "fclose": [ "int32", [ "pointer" ] ]
});

assertInstanceof(thisfuncs, FFI.Library);

var fd = thisfuncs.fopen("/etc/passwd", "r");
assertTrue(!fd.isNull());

assertEquals(0, thisfuncs.fclose(fd));

///////////////////////

var closureCalled = 0;
var cifPtr = new FFI.CIF("int32", [ "int32" ]);
var clz = new FFI.CallbackInfo(cifPtr.getPointer(), function(result, args) {
    closureCalled++;
});

var callMyTestClosure = FFI.ForeignFunction.build(clz.pointer, "int32", [ "int32" ]);
callMyTestClosure(1);
callMyTestClosure(1);
assertEquals(2, closureCalled);

///////////////////////

var asyncClosureCalled = 0;
var cifPtr = new FFI.CIF("int32", [ "int32" ]);
var clz = new FFI.CallbackInfo(cifPtr.getPointer(), function(result, args) {
    asyncClosureCalled++;
    result.putInt32(1234);
});

var callMyTestClosure = FFI.ForeignFunction.build(clz.pointer, "int32", [ "int32" ], true);
callMyTestClosure(1).addCallback(function(res) {
   assertEquals(1234, res);
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

assertEquals(1234, callMyTestCallback(-1234));

///////////////////////

var asyncAbs = FFI.ForeignFunction.build(FFI.StaticFunctions.abs, "int32", [ "int32" ], true);
asyncAbs(-1234).addCallback(function (res) {
    assertEquals(1234, res);
});

var libm = new FFI.Library("libm", { "ceil": [ "double", [ "double" ], {"async": true} ] });
assertInstanceof(libm, FFI.Library);
assertInstanceof(libm.ceil, Function);
libm.ceil(1.5).addCallback(function(res) { assertEquals(2, res); });

// var sleeplib = new FFI.Library(null, { "sleep": [ "uint32", [ "uint32" ], {"async": true} ] });
// sleeplib.sleep(1).wait();

///////////////////////
///////////////////////

// allow the event loop to complete
setTimeout(function() {
    assertEquals(1, asyncClosureCalled);
    sys.puts("Tests pass!");
}, 2000);

sys.puts("Heap increased by " + ((process.memoryUsage()["rss"] - rss) / 1024) + " KB");
