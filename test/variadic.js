
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')

describe('varargs', function () {

  afterEach(gc)

  it('should work with vararg C functions', function () {
    var printfPtr = ffi.DynamicLibrary().get('printf')
    var printfGen = ffi.VariadicForeignFunction(printfPtr, 'int', [ 'string' ])
    printfGen()('hello world!')
  })

})
