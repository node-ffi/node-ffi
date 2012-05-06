
var assert = require('assert')
  , ffi = require('../')

describe('Callback', function () {

  afterEach(gc)

  it('should create a C function pointer from a JS function', function () {
    var callback = ffi.Callback('void', [ ], function (val) { })
    assert(Buffer.isBuffer(callback))
  })

  it('should be invokable by an ffi\'d ForeignFunction', function () {
    var funcPtr = ffi.Callback('int', [ 'int' ], Math.abs)
    var func = ffi.ForeignFunction(funcPtr, 'int', [ 'int' ])
    assert.equal(1234, func(-1234))
  })

  it('should be invokable asynchronously by an ffi\'d ForeignFunction', function () {
    var funcPtr = ffi.Callback('int', [ 'int' ], Math.abs)
    var func = ffi.ForeignFunction(funcPtr, 'int', [ 'int' ])
    func.async(-9999, function (err, res) {
      assert.equal(null, err)
      assert.equal(9999, res)
    })
  })

})
