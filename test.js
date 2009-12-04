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

assertInstanceof(FFI.StaticFunctions, Object);
assertInstanceof(FFI.StaticFunctions.dlopen, Pointer);
assertInstanceof(FFI.StaticFunctions.dlclose, Pointer);
assertInstanceof(FFI.StaticFunctions.dlsym, Pointer);
assertInstanceof(FFI.StaticFunctions.dlerror, Pointer);

//////////////////////

sys.puts("Heap increased by " + ((process.memoryUsage()["rss"] - rss) / 1024) + " KB");
sys.puts("Tests pass!");
