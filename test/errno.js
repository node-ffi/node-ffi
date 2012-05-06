
var expect = require('expect.js')
  , ref = require('ref')
  , ffi = require('../')
  , errno = ffi.errno
  , charPtr = ref.refType(ref.types.char)

describe('errno()', function () {

  afterEach(gc)

  it('should be a function', function () {
    expect(errno).to.be.a('function')
  })

  it('should set the errno with out-of-range "strtoul" value', function () {
    var lib = process.platform == 'win32' ? 'msvcrt' : 'libc'
    var strtoul = new ffi.Library(lib, {
      'strtoul': [ 'ulong', [ 'string', charPtr, 'int' ] ]
    }).strtoul
    var before = errno()
    strtoul('1234567890123456789012345678901234567890', null, 0)
    expect(errno()).to.not.equal(before)
    expect(errno()).to.equal(34) // errno == ERANGE
  })

})
