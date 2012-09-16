
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')
  , int = ref.types.int
  , bindings = require('bindings')({ module_root: __dirname, bindings: 'ffi_tests' })

describe('Callback', function () {

  afterEach(gc)

  it('should create a C function pointer from a JS function', function () {
    var callback = ffi.Callback('void', [ ], function (val) { })
    assert(Buffer.isBuffer(callback))
  })

  it('should be invokable by an ffi\'d ForeignFunction', function () {
    var funcPtr = ffi.Callback(int, [ int ], Math.abs)
    var func = ffi.ForeignFunction(funcPtr, int, [ int ])
    assert.equal(1234, func(-1234))
  })

  it('should work with a "void" return type', function () {
    var funcPtr = ffi.Callback('void', [ ], function (val) { })
    var func = ffi.ForeignFunction(funcPtr, 'void', [ ])
    assert.strictEqual(null, func())
  })

  describe('async', function () {

    it('should be invokable asynchronously by an ffi\'d ForeignFunction', function (done) {
      var funcPtr = ffi.Callback(int, [ int ], Math.abs)
      var func = ffi.ForeignFunction(funcPtr, int, [ int ])
      func.async(-9999, function (err, res) {
        assert.equal(null, err)
        assert.equal(9999, res)
        done()
      })
    })

    it('should work being invoked multiple times', function (done) {
      var invokeCount = 0
      var cb = ffi.Callback('void', [ ], function () {
        invokeCount++
      })

      bindings.set_cb(cb)
      assert.equal(0, invokeCount)

      bindings.call_cb()
      assert.equal(1, invokeCount)

      setTimeout(function () {
        gc() // collect the "cb" Buffer
        setTimeout(finish, 500)
      }, 500)

      function finish () {
        bindings.call_cb()
        assert.equal(2, invokeCount)
        done()
      }
    })

  })

})
