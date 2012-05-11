
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')

describe('ffi_cif', function () {

  afterEach(gc)

  it('should return a Buffer representing the `ffi_cif` instance', function () {
    var cif = ffi.CIF(ref.types.void, [ ])
    assert(Buffer.isBuffer(cif))
  })

  it('should throw an Error when given an invalid ABI argument', function () {
    assert.throws(function () {
      ffi.CIF(ref.types.void, [], -1)
    }, function (err) {
      assert(err.message.indexOf('FFI_BAD_ABI') !== -1)
      assert.equal('FFI_BAD_ABI', err.code)
      assert.equal(ffi.Bindings.FFI_BAD_ABI, err.errno)
      return true
    })
  })

})
