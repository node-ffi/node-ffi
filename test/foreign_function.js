
var expect = require('expect.js')
  , ffi = require('../')

describe('ForeignFunction', function () {

  it('should call the static "abs" bindings', function () {
    var abs = ffi.ForeignFunction.build(
        ffi.Bindings.StaticFunctions.abs
      , 'int32', [ 'int32' ])
    expect(abs).to.be.a('function')
    expect(abs(-1234)).to.equal(1234)
  })

  describe('async', function () {

    it('should call the static "abs" bindings asynchronously', function (done) {
      var abs = ffi.ForeignFunction.build(
                    ffi.Bindings.StaticFunctions.abs
                  , 'int32', [ 'int32' ], true)
      expect(abs).to.be.a('function')
      abs(-1234).on('success', function (res) {
        expect(res).to.equal(1234)
        done()
      })
    })

  })
})
