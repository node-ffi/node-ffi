
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')
  , errno = ffi.errno
  , charPtr = ref.refType(ref.types.char)

describe('varargs', function () {

  afterEach(gc)

  it('should work with vararg C functions', function () {
    var printfPtr = ffi.DynamicLibrary().get('printf')
    var printfGen = ffi.VariadicForeignFunction(printfPtr, 'int', [ 'string' ])
    printfGen()('hello world!')
  })

})
