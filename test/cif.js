
var assert = require('assert')
  , ref = require('ref')
  , CIF = require('../lib/cif')
  , Types = require('../lib/types')
  , bindings = require('../lib/bindings')

describe('ffi_cif', function () {

  afterEach(gc)

  it('should return a Buffer representing the `ffi_cif` instance', function () {
    var cif = CIF(ref.types.void, [ ])
    assert(Buffer.isBuffer(cif))
  })

  it('should throw an Error when given an invalid "type"', function () {
    var ffi_type = new Types.FFI_TYPE
    ffi_type.size = 0
    ffi_type.alignment = 0
    ffi_type.type = 0
    ffi_type.elements = ref.NULL

    var bad_type = { size: 1, indirection: 1, ffi_type: ffi_type.ref() }
    assert.throws(function () {
      CIF(bad_type, [])
    }, function (err) {
      assert(err.message.indexOf('FFI_BAD_TYPEDEF') !== -1)
      assert.equal('FFI_BAD_TYPEDEF', err.code)
      assert.equal(bindings.FFI_BAD_TYPEDEF, err.errno)
      return true
    })
  })

  it('should throw an Error when given an invalid ABI argument', function () {
    assert.throws(function () {
      CIF(ref.types.void, [], -1)
    }, function (err) {
      assert(err.message.indexOf('FFI_BAD_ABI') !== -1)
      assert.equal('FFI_BAD_ABI', err.code)
      assert.equal(bindings.FFI_BAD_ABI, err.errno)
      return true
    })
  })

})
