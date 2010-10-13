var FFI = require("./ffi");
var sys = require("sys");
var rss = process.memoryUsage()["rss"];

var numberOfMethodsToExecute = 1000000;
var start = Date.now();
var absLibrary = new FFI.Library(null, { "abs": [ "int32", [ "int32" ] ] });
//for (var i = 0; i < numberOfMethodsToExecute; i++) {
 //   absLibrary.abs(1234);
//}
var elapsed = (Date.now() - start) / 1000.0;
sys.puts("FFI: Time to execute " + numberOfMethodsToExecute + " functions: " + elapsed + "s (" +
    numberOfMethodsToExecute / elapsed + " per second)");

function jsAbs(val) {
    if (val < 0) {
        return val - (val * 2);
    }
}

var start = Date.now();
var val;
for (var i = 0; i < numberOfMethodsToExecute; i++) {
    val = jsAbs(-1234);
}
var elapsed = (Date.now() - start) / 1000.0;
sys.puts("Native: Time to execute " + numberOfMethodsToExecute + " functions: " + elapsed + "s (" +
    numberOfMethodsToExecute / elapsed + " per second)");


sys.puts("Heap increased by " + ((process.memoryUsage()["rss"] - rss) / 1024) + " KB");
