
var expect = require('expect.js')
  , assert = require('assert')
  , ref = require('ref')
  , Struct = require('ref-struct')
  , ffi = require('../')
  , bindings = require('./build/Release/ffi_tests')

describe('ForeignFunction', function () {

  afterEach(gc)

  // same struct as defined in ffi_tests.cc
  var box = Struct({
      width: ref.types.int
    , height: ref.types.int
  })

  it('should call the static "abs" bindings', function () {
    var _abs = bindings.abs
    var abs = ffi.ForeignFunction(_abs, 'int', [ 'int' ])
    expect(abs).to.be.a('function')
    expect(abs(-1234)).to.equal(1234)
  })

  it('should call the static "atoi" bindings', function () {
    var _atoi = bindings.atoi
    var atoi = ffi.ForeignFunction(_atoi, 'int', [ 'string' ])
    expect(atoi).to.be.a('function')
    expect(atoi('1234')).to.equal(1234)
  })

  it('should call the static "double_box" bindings', function () {
    var double_box = ffi.ForeignFunction(bindings.double_box, box, [ box ])
    var b = new box
    assert(b instanceof box)
    b.width = 4
    b.height = 5
    var out = double_box(b)
    assert(out instanceof box)
    assert.equal(8, out.width)
    assert.equal(10, out.height)
  })

  describe('async', function () {

    it('should call the static "abs" bindings asynchronously', function (done) {
      var _abs = bindings.abs
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
