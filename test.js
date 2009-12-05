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

ptr.putByte(128);
assertEquals(128, ptr.getByte());

assertThrows("ptr.putByte(1024)");

ptr.putInt32(1024 * 1024);
assertEquals(1024 * 1024, ptr.getInt32());

ptr.putUInt32(1024 * 1024);
assertEquals(1024 * 1024, ptr.getUInt32());

ptr.putDouble(1000.005);
assertEquals(1000.005, ptr.getDouble());

var nptr = new Pointer(32);
nptr.putDouble(1234.5678);
ptr.putPointer(nptr);
assertEquals(nptr.address, ptr.getPointer().address);
assertEquals(1234.5678, ptr.getPointer().getDouble());

//////////////////////

// test put + advance calls
var advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putByte(1, true);
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
advptr.putDouble(1, true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.putPointer(ptr, true);
assertTrue(advptr.address > ptr.address);

// test get + advance calls

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getByte(true);
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
advptr.getDouble(true);
assertTrue(advptr.address > ptr.address);

advptr = ptr.seek(0);
assertTrue(advptr.address == ptr.address);
advptr.getPointer(true);
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
    ["int32", "int32Val"],
    ["uint32", "uint32Val"],
    ["double", "doubleVal"],
    ["pointer", "pointerVal"]
]);
var allStruct_testPtr = new Pointer(4);
var allptr = allStruct.allocate({
   "byteVal": 100,
   "int32Val": -10000,
   "uint32Val": 10000,
   "doubleVal": 1.25,
   "pointerVal": allStruct_testPtr
});

assertEquals(100, allStruct.readField(allptr, "byteVal"));
assertEquals(-10000, allStruct.readField(allptr, "int32Val"));
assertEquals(10000, allStruct.readField(allptr, "uint32Val"));
assertEquals(1.25, allStruct.readField(allptr, "doubleVal"));
assertEquals(allStruct_testPtr.address, allStruct.readField(allptr, "pointerVal").address);

//////////////////////
assertInstanceof(FFI.Bindings.FFI_TYPES["void"], FFI.Pointer);
assertInstanceof(FFI.Bindings.FFI_TYPES["uint8"], FFI.Pointer);

//////////////////////

var cifatInitial = FFI.Internal.buildCIFArgTypes(["uint8", "double"]);
assertInstanceof(cifatInitial, FFI.Pointer);

var cifat = cifatInitial.seek(0);
assertEquals(FFI.Bindings.FFI_TYPES["uint8"].address,   cifat.getPointer(true).address);
assertEquals(FFI.Bindings.FFI_TYPES["double"].address,  cifat.getPointer(true).address);

//////////////////////

var cifArgTypeProto = [ "uint32" ];
var cifArgTypes = FFI.Internal.buildCIFArgTypes(cifArgTypeProto);

assertInstanceof(cifArgTypes, FFI.Pointer);

var cifPtr = FFI.Bindings.prepCif(
    cifArgTypeProto.length,
    FFI.Bindings.FFI_TYPES["uint32"],
    cifArgTypes
);

assertInstanceof(cifPtr, FFI.Pointer);

var cifArgInteger = new FFI.Pointer(FFI.Bindings.TYPE_SIZE_MAP["int32"]);
cifArgInteger.putInt32(-1234);

var cifArgValues = FFI.Internal.buildCIFArgValues([cifArgInteger]);
assertInstanceof(cifArgValues, FFI.Pointer);

// cif, fun, args, res
var resPtr = new FFI.Pointer(FFI.Bindings.TYPE_SIZE_MAP["int32"]);

FFI.Bindings.call(
    cifPtr,
    FFI.StaticFunctions.abs,
    cifArgValues,
    resPtr
);

assertEquals(1234, resPtr.getInt32());

//////////////////////

sys.puts("Heap increased by " + ((process.memoryUsage()["rss"] - rss) / 1024) + " KB");
sys.puts("Tests pass!");
