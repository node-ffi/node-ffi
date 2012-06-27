
var assert = require('assert')
  , ref = require('ref')
  , Callback = require('../lib/callback')
  , ForeignFunction = require('../lib/foreign_function')
  , int = ref.types.int

describe('Callback', function () {

  afterEach(gc)

  it('should create a C function pointer from a JS function', function () {
    var callback = Callback('void', [ ], function (val) { })
    assert(Buffer.isBuffer(callback))
  })

  it('should be invokable by an ffi\'d ForeignFunction', function () {
    var funcPtr = Callback(int, [ int ], Math.abs)
    var func = ForeignFunction(funcPtr, int, [ int ])
    assert.equal(1234, func(-1234))
  })

  it('should work with a "void" return type', function () {
    var funcPtr = Callback('void', [ ], function (val) { })
    var func = ForeignFunction(funcPtr, 'void', [ ])
    assert.strictEqual(null, func())
  })

  describe('async', function () {

    it('should be invokable asynchronously by an ffi\'d ForeignFunction', function () {
      var funcPtr = Callback(int, [ int ], Math.abs)
      var func = ForeignFunction(funcPtr, int, [ int ])
      func.async(-9999, function (err, res) {
        assert.equal(null, err)
        assert.equal(9999, res)
      })
    })

  })

})
