
var expect = require('expect.js')
  , ffi = require('../')
  , Struct = ffi.Struct

describe('Struct', function () {

  it('should be a function', function () {
    expect(Struct).to.be.a('function')
  })

  it('should return a struct constuctor function', function () {
    var S = Struct()
    expect(S).to.be.a('function')
  })

  it('should throw when the same field name is speicified more than once', function () {
    expect(Struct.bind(null, [
        [ 'byte', 'a' ]
      , [ 'byte', 'a' ]
    ])).to.throwException()
  })

  it('should work in a simple case', function () {
    var SimpleStruct = new Struct([
        ['byte', 'first']
      , ['byte', 'last']
    ])
    var ss = new SimpleStruct({ first: 50, last: 100 })
    expect(ss.first).to.be.equal(50)
    expect(ss.last).to.be.equal(100)
  })

  it('should work in a more complex case', function () {
    var MegaStruct = new Struct([
        ['byte', 'byteVal']
      , ['int8', 'int8Val']
      , ['int16', 'int16Val']
      , ['uint16', 'uint16Val']
      , ['int32', 'int32Val']
      , ['uint32', 'uint32Val']
      , ['float', 'floatVal']
      , ['double', 'doubleVal']
      , ['pointer', 'pointerVal']
    ])
    var msTestPtr = new ffi.Pointer(1)
    var ms = new MegaStruct({
        byteVal: 100
      , int8Val: -100
      , int16Val: -1000
      , uint16Val: 1000
      , int32Val: -10000
      , uint32Val: 10000
      , floatVal: 1.25
      , doubleVal: 1000.0005
      , pointerVal: msTestPtr
    })
    expect(ms.byteVal).to.equal(100)
    expect(ms.int8Val).to.equal(-100)
    expect(ms.int16Val).to.equal(-1000)
    expect(ms.uint16Val).to.equal(1000)
    expect(ms.int32Val).to.equal(-10000)
    expect(ms.uint32Val).to.equal(10000)
    expect(ms.floatVal).to.equal(1.25)
    expect(ms.doubleVal).to.equal(1000.0005)
    expect(ms.pointerVal.address).to.equal(msTestPtr.address)
  })
})
