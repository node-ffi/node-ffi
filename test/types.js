
var assert = require('assert')
  , ref = require('ref')
  , Types = require('../lib/types')

describe('types', function () {

  describe('`ffi_type` to ref type matchups', function () {

    Object.keys(ref.types).forEach(function (name) {
      it('should match a valid `ffi_type` for "' + name + '"', function () {
        var type = ref.types[name]
        var ffi_type = Types.ffiType(type)
        assert(Buffer.isBuffer(ffi_type))
      })
    })

  })

})
