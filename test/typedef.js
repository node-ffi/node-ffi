var expect = require('expect.js')
  , assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')
  , bindings = require('bindings')({ module_root: __dirname, bindings: 'ffi_tests' })

describe('TypeDef', function () {

  afterEach(gc)

  it('should assert on improper type', function () {
    var myType = ffi.TypeDef(ref.refType(ref.types.void))

    var sprintfGen = ffi.VariadicForeignFunction(bindings.sprintf,
      ref.types.int32, [ ref.refType(ref.types.void), ref.types.CString ])

    var buf = new Buffer(100)

    var instance = ref.alloc(ref.refType(ref.types.void))

    var sprintf = sprintfGen(myType)

    var expectedAssert;

    assert.throws(function () {
      sprintf(buf, '%p', instance)
    }, /AssertionError: Argument 2 is not the right type/);

    assert.doesNotThrow(function () {
      sprintf(buf, '%p', myType.cast(instance))
    })

    assert.equal(parseInt(buf.readCString()), instance.address())
  }) 
})
