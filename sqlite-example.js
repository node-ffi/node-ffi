var FFI = require("./ffi");
var sys = require("sys");

var SQLite3 = new FFI.Library("libsqlite3", {
    "sqlite3_open": [ "int32", [ "string", "pointer" ] ],
    "sqlite3_close": [ "int32", [ "pointer" ] ],
    "sqlite3_exec": [ "int32", [ "pointer", "string", "pointer", "pointer", "pointer" ] ],
    "sqlite3_changes": [ "int32", [ "pointer" ]]
});

// create a storage area for the db pointer SQLite3 gives us
var db = new FFI.Pointer(FFI.Bindings.POINTER_SIZE);

sys.puts("Opening test.sqlite3...");
SQLite3.sqlite3_open("test.sqlite3", db);
var dbh = db.getPointer(); // we have to extract the pointer as it's an output param

sys.puts("Creating foo table...");

SQLite3.sqlite3_exec(dbh, "CREATE TABLE foo (bar VARCHAR);", null, null, null)

sys.puts("Inserting bar 5 times...");

for (var i = 0; i < 5; i++) {
    SQLite3.sqlite3_exec(dbh, "INSERT INTO foo VALUES('bar');", null, null, null);
}

sys.puts("Changes: " + SQLite3.sqlite3_changes(dbh));

sys.puts("Closing...");

SQLite3.sqlite3_close(dbh);
