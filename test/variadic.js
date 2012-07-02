
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')
  , snprintfPtr = require('./build/Release/ffi_tests').snprintf

describe('variadic arguments', function () {

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

    snprintfGen('string')(buf, buf.length, ' %s ', 'test')
    assert.equal(buf.readCString(), ' test ')
  })

  it('should return the same Function instance when the same arguments are used', function () {
    var snprintfGen = ffi.VariadicForeignFunction(snprintfPtr, 'int', [ 'pointer', 'size_t', 'string' ])

    var one = snprintfGen('int')
    var two = snprintfGen(ref.types.int)

    assert.strictEqual(one, two)
  })

})
