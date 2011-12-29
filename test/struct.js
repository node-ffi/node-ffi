
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

})
