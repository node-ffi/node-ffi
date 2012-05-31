var ffi    = require('../')
  , fs     = require('fs')
  , ref    = require('ref')
  , assert = require('assert')
  , dbName = 'test.sqlite3'

var SQLite3 = ffi.Library('libsqlite3', {
  'sqlite3_open': [ 'int32', [ 'string', 'pointer' ] ],
  'sqlite3_close': [ 'int32', [ 'pointer' ] ],
  'sqlite3_changes': [ 'int32', [ 'pointer' ]],
  'sqlite3_exec': [ 'int32', [ 'pointer', 'string', 'pointer', 'pointer', 'pointer' ] ],
})

// create a storage area for the db pointer SQLite3 gives us
var db = new Buffer(ref.sizeof.pointer)

console.log('Opening ' + dbName + '...')
SQLite3.sqlite3_open(dbName, db)
var dbh = db.readPointer() // we have to extract the pointer as it's an output param

console.log('Creating and/or clearing foo table...')

SQLite3.sqlite3_exec(dbh, 'CREATE TABLE foo (bar VARCHAR);', null, null, null)
SQLite3.sqlite3_exec(dbh, 'DELETE FROM foo;', null, null, null)

console.log('Inserting bar 5 times...')

for (var i = 0; i < 5; i++) {
  SQLite3.sqlite3_exec(dbh, 'INSERT INTO foo VALUES(\'baz' + i + '\');', null, null, null)
}

var rowCount = 0
var callback = ffi.Callback('int32', ['pointer', 'int32', 'pointer', 'pointer'], function(tmp, cols, argv, colv) {
  var obj = {}

  for (var i = 0; i < cols; i++) {
    var colName = colv.readPointer().readCString()
    var colData = argv.readPointer().readCString()
    obj[colName] = colData
  }

  console.log('Row: ' + JSON.stringify(obj))
  rowCount++

  return 0
})

var fin = false

SQLite3.sqlite3_exec.async(dbh, 'SELECT * FROM foo;', callback, null, null, function(err, ret) {
  if (err) throw err
  console.log('Total Rows: ' + rowCount)
  console.log('Changes: ' + SQLite3.sqlite3_changes(dbh))
  console.log('Closing...')
  SQLite3.sqlite3_close(dbh)
  fs.unlinkSync(dbName)
  fin = true
})

process.on('exit', function () {
  assert(fin)
})
