var expect = require('expect.js')
  , ffi = require('../')
  , Pointer = ffi.Pointer

describe('Pointer', function () {

  it('should work with the `new` operator', function () {
    var p = new Pointer(8)
      , test = p instanceof Pointer
    expect(test).to.be.true
  })

  it('should have a valid "address"', function () {
    var p = new Pointer(8)
    expect(p.address).to.be.greaterThan(0)
  })

  describe('seek()', function () {

    it('should have function "seek()"', function () {
      expect(Pointer.prototype).to.have.property('seek')
    })

    it('should return a new Pointer instance', function () {
      var p = new Pointer(8)
        , p2 = p.seek(0)
        , test = p2 instanceof Pointer
      expect(test).to.be.true
      expect(p).to.not.equal(p2)
    })

    it('should return a Pointer with its "address" offset by the specified amount'
    , function () {
      var p = new Pointer(8)
        , p2 = p.seek(32)
      expect(p2.address).to.equal(p.address + 32)
    })

  })

  describe('putInt8()', function () {

    it('should throw on out of bounds values (minimum)', function () {
      var p = new Pointer(8)
        , val = Math.pow(2, 7) + 1
      expect(p.putInt8.bind(p, val)).to.throwException()
    })

    it('should throw on out of bounds values (maximum)', function () {
      var p = new Pointer(8)
        , val = 0 - Math.pow(2, 7) - 1
      expect(p.putInt8.bind(p, val)).to.throwException()
    })

    it('should write an "int8" value properly', function () {
      var p = new Pointer(8)
        , val = 0 - Math.pow(2, 7)
      p.putInt8(val)
      expect(p.getInt8()).to.equal(val)
    })

  })

  describe('putUInt8()', function () {

    it('should throw on out of bounds values (minimum)', function () {
      var p = new Pointer(8)
        , val = -1
      expect(p.putUInt8.bind(p, val)).to.throwException()
    })

    it('should throw on out of bounds values (maximum)', function () {
      var p = new Pointer(8)
        , val = Math.pow(2, 8)
      expect(p.putUInt8.bind(p, val)).to.throwException()
    })

    it('should write a "uint8" value properly', function () {
      var p = new Pointer(8)
        , val = Math.pow(2, 8) - 1
      p.putUInt8(val)
      expect(p.getUInt8()).to.equal(val)
    })

  })

  describe('putInt16()', function () {

    it('should throw on out of bounds values (minimum)', function () {
      var p = new Pointer(8)
        , val = Math.pow(2, 15) + 1
      expect(p.putInt16.bind(p, val)).to.throwException()
    })

    it('should throw on out of bounds values (maximum)', function () {
      var p = new Pointer(8)
        , val = 0 - Math.pow(2, 15) - 1
      expect(p.putInt16.bind(p, val)).to.throwException()
    })

    it('should write an "int16" value properly', function () {
      var p = new Pointer(8)
        , val = 0 - Math.pow(2, 15)
      p.putInt16(val)
      expect(p.getInt16()).to.equal(val)
    })

  })

  describe('putUInt16()', function () {

    it('should throw on out of bounds values (minimum)', function () {
      var p = new Pointer(8)
        , val = -1
      expect(p.putUInt8.bind(p, val)).to.throwException()
    })

    it('should throw on out of bounds values (maximum)', function () {
      var p = new Pointer(8)
        , val = Math.pow(2, 16)
      expect(p.putUInt16.bind(p, val)).to.throwException()
    })

    it('should write a "uint8" value properly', function () {
      var p = new Pointer(8)
        , val = Math.pow(2, 16) - 1
      p.putUInt16(val)
      expect(p.getUInt16()).to.equal(val)
    })

  })

})
