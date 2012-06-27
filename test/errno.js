
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')
  , errno = ffi.errno
  , charPtr = ref.refType(ref.types.char)

describe('errno()', function () {

  afterEach(gc)

  it('should be a function', function () {
    assert.equal('function', typeof errno)
  })

  it('should set the errno with out-of-range "strtoul" value', function () {
    var lib = process.platform == 'win32' ? 'msvcrt' : 'libc'
    var strtoul = new ffi.Library(lib, {
      'strtoul': [ 'ulong', [ 'string', charPtr, 'int' ] ]
    }).strtoul
    var before = errno()
    strtoul('1234567890123456789012345678901234567890', null, 0)
    assert.notEqual(before, errno())
    assert.equal(34, errno()) // errno == ERANGE
  })

})
