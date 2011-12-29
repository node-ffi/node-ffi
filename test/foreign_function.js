
var expect = require('expect.js')
  , ffi = require('../')

describe('ForeignFunction', function () {

  describe('async', function () {

    it('should call static "abs" bindings asynchronously', function (done) {
      var abs = ffi.ForeignFunction.build(
                    ffi.Bindings.StaticFunctions.abs
                  , 'int32', [ 'int32' ], true)
      abs(-1234).on('success', function (res) {
        expect(res).to.equal(1234)
        done()
      })
    })

  })
})
