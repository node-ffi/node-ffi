
var expect = require('expect.js')
  , ffi = require('../')
  , Pointer = ffi.Pointer
  , Callback = ffi.Callback

describe('Callback', function () {

  it('should create a C function pointer for a JS function', function () {
    var callback = new Callback(['int32', ['int32']], function (val) {
      return Math.abs(val)
    })
    var pointer = callback.getPointer()
    expect(Pointer.isPointer(pointer)).to.be(true)
  })

})
