
var assert = require('assert')
  , ffi = require('../')

describe('Callback', function () {

  afterEach(gc)

  it('should create a C function pointer for a JS function', function () {
    var callback = ffi.Callback('int32', [ 'int32' ], function (val) {
      return Math.abs(val)
    })
    assert(Buffer.isBuffer(callback))
  })

  it('should be invokable', function () {
    console.error('afsd')
    var callback = ffi.Callback('int32', [ 'int32' ], function (val) {
      console.error('inside callback!!!')
      return Math.abs(val)
    })
    var func = ffi.ForeignFunction(callback, 'int32', [ 'int32' ])
    assert.equal(1234, func(-1234))
  })

})
