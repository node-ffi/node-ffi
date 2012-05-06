
var assert = require('assert')
  , ffi = require('../')

describe('Callback', function () {

  afterEach(gc)

  it('should create a C function pointer from a JS function', function () {
    var callback = ffi.Callback('void', [ ], function (val) { })
    assert(Buffer.isBuffer(callback))
  })

  it('should be invokable', function () {
    var callback = ffi.Callback('int', [ 'int' ], function (val) {
      return Math.abs(val)
    })
    var func = ffi.ForeignFunction(callback, 'int', [ 'int' ])
    assert.equal(1234, func(-1234))
  })

})
