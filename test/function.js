
var assert = require('assert')
  , ref = require('ref')
  , ffi = require('../')

describe('Function "type"', function () {

  afterEach(gc)

  it('should be a function', function () {
    assert.equal('function', typeof ffi.Function)
  })

  it('should return a "type" object when invoked with a return type and array of arguments types', function () {
    var type = ffi.Function('void', [])
    assert(type)
    assert.equal('function', typeof type.get)
    assert.equal('function', typeof type.set)
  })

  it('should be accepted as a return "type"', function () {
    assert(0, 'implement')
  })

  it('should be accepted as a return "type"', function () {
    assert(0, 'implement')
  })

})
