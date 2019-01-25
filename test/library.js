
var assert = require('assert')
  , ref = require('ref')
  , Struct = require('ref-struct')
  , ffi = require('../')
  , Library = ffi.Library

describe('Library', function () {

  var charPtr = ref.refType(ref.types.char)

  afterEach(gc)

  it('should be a function', function () {
    assert(typeof Library === 'function');
  })

  it('should work with the `new` operator', function () {
    var l = new Library()
    assert(typeof l === 'object');
  })

  it('should accept `null` as a first argument', function () {
    if (process.platform == 'win32') {
      // On Windows, null refers to just the main executable (e.g. node.exe).
      // Windows never searches for symbols across multiple DLL's.
      // Note: Exporting symbols from an executable is unusual on Windows.
      // Normally you only see exports from DLL's. It happens that node.exe
      // does export symbols, so null as a first argument can be tested.
      // This is an implementation detail of node, and could potentially
      // change in the future (e.g. if node gets broken up into DLL's
      // rather than being one large static linked executable).
      var winFuncs = new Library(null, {
        'uv_fs_open': [ 'void', [ charPtr ] ]
      })
      assert(typeof winFuncs.uv_fs_open === 'function');
    } else {
      // On POSIX, null refers to the global symbol table, and lets you use
      // symbols in the main executable and loaded shared libaries.
      var posixFuncs = new Library(null, {
        'printf': [ 'void', [ charPtr ] ]
      })
      assert(typeof posixFuncs.printf === 'function');
    }
  })

  it('should accept a lib name as the first argument', function () {
    var lib = process.platform == 'win32' ? 'msvcrt' : 'libm'
    var libm = new Library(lib, {
        'ceil': [ 'double', [ 'double' ] ]
    })
    assert(typeof libm.ceil === 'function');
    assert(libm.ceil(1.1) === 2);
  })

  it('should accept a lib name with file extension', function() {
    var lib = process.platform == 'win32'
      ? 'msvcrt.dll'
      : 'libm' + ffi.LIB_EXT
    var libm = new Library(lib, {
      'ceil': [ 'double', ['double'] ]
    })
    assert(typeof libm.ceil === 'function');
    assert(libm.ceil(100.9) === 101);
  })

  it('should throw when an invalid function name is used', function () {
    try {
      new Library(null, {
          'doesnotexist__': [ 'void', [] ]
      });
      assert(false); // unreachable
    } catch (e) {
      assert(e);
    }
  })

  it('should work with "strcpy" and a 128 length string', function () {
    var lib = process.platform == 'win32' ? 'msvcrt.dll' : null;
    var ZEROS_128 = Array(128 + 1).join('0');
    var buf = Buffer.alloc(256);
    var strcpy = new Library(lib, {
        'strcpy': [ charPtr, [ charPtr, 'string' ] ]
    }).strcpy;
    strcpy(buf, ZEROS_128);
    assert(buf.readCString() === ZEROS_128);
  })

  it('should work with "strcpy" and a 2k length string', function () {
    var lib = process.platform == 'win32' ? 'msvcrt' : null;
    var ZEROS_2K = Array(2e3 + 1).join('0');
    var buf = Buffer.from(4096);
    var strcpy = new Library(lib, {
        'strcpy': [ charPtr, [ charPtr, 'string' ] ]
    }).strcpy;
    strcpy(buf, ZEROS_2K);
    assert(buf.readCString() === ZEROS_2K);
  })

  if (process.platform == 'win32') {

    it('should work with "GetTimeOfDay" and a "FILETIME" Struct pointer',
    function () {
      var FILETIME = new Struct({
          'dwLowDateTime': ref.types.uint32
        , 'dwHighDateTime': ref.types.uint32
      })
      var l = new Library('kernel32', {
          'GetSystemTimeAsFileTime': [ 'void', [ 'pointer' ]]
      })
      var ft = new FILETIME()
      l.GetSystemTimeAsFileTime(ft.ref())
      // TODO: Add an assert clause here...
    })

  } else {

    it('should work with "gettimeofday" and a "timeval" Struct pointer',
    function () {
      var timeval = new Struct({
          'tv_sec': ref.types.long
        , 'tv_usec': ref.types.long
      })
      var timevalPtr = ref.refType(timeval)
      var timezonePtr = ref.refType(ref.types.void)
      var l = new Library(null, {
          'gettimeofday': [ref.types.int, [timevalPtr, timezonePtr]]
      })
      var tv = new timeval()
      l.gettimeofday(tv.ref(), null)
      assert.equal(Math.floor(Date.now() / 1000), tv.tv_sec)
    })

  }

  describe('async', function () {

    it('should call a function asynchronously', function (done) {
      var lib = process.platform == 'win32' ? 'msvcrt' : 'libm'
      var libm = new Library(lib, {
          'ceil': [ 'double', [ 'double' ], { async: true } ]
      })
      libm.ceil(1.1, function (err, res) {
        assert(err === null);
        assert(res === 2);
        done();
      })
    })

  })

})
