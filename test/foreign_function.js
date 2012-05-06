
var expect = require('expect.js')
  , ffi = require('../')

describe('ForeignFunction', function () {

  afterEach(gc)

  it('should call the static "abs" bindings', function () {
    var _abs = ffi.Bindings.StaticFunctions.abs
    var abs = ffi.ForeignFunction(_abs, 'int', [ 'int' ])
    expect(abs).to.be.a('function')
    expect(abs(-1234)).to.equal(1234)
  })

  it('should call the static "atoi" bindings', function () {
    var _atoi = ffi.Bindings.StaticFunctions.atoi
    var atoi = ffi.ForeignFunction(_atoi, 'int', [ 'string' ])
    expect(atoi).to.be.a('function')
    expect(atoi('1234')).to.equal(1234)
  })

  describe('async', function () {

    it('should call the static "abs" bindings asynchronously', function (done) {
      var _abs = ffi.Bindings.StaticFunctions.abs
      var abs = ffi.ForeignFunction(_abs, 'int', [ 'int' ])
      expect(abs).to.be.a('function')

      // invoke asynchronously
      abs.async(-1234, function (err, res) {
        expect(err).to.equal(null)
        expect(res).to.equal(1234)
        done()
      })
    })

  })
})
