
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')
  , snprintfPtr = require('./build/Release/ffi_tests').snprintf

describe('varargs', function () {

  afterEach(gc)

  it('should work with vararg C functions', function () {
    var buf = new Buffer(100)
    var snprintfGen = ffi.VariadicForeignFunction(snprintfPtr, 'int', [ 'pointer', 'size_t', 'string' ])

    snprintfGen()(buf, buf.length, 'hello world!')
    assert.equal(buf.readCString(), 'hello world!')

    snprintfGen('int')(buf, buf.length, '%d', 42)
    assert.equal(buf.readCString(), '42')

    snprintfGen('double')(buf, buf.length, '%10.2f', 3.14)
    assert.equal(buf.readCString(), '      3.14')
  })

})
