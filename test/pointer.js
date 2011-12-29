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

  })

})
