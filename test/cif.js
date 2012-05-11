
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
    }, /FFI_BAD_ABI/)
  })

})
