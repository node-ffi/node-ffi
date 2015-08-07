
var assert = require('assert')
  , path = require('path')
  , ref = require('ref')
  , ffi = require('../')
  , fs = require('fs-extra')
  , DynamicLibrary = ffi.DynamicLibrary

describe('DynamicLibrary', function () {

  it('should be a function', function () {
    assert.equal('function', typeof DynamicLibrary)
  })

  it('should return a "DynamicLibrary" instance when invoked', function () {
    var lib = process.platform == 'win32' ? 'msvcrt' : 'libc'
    var handle = DynamicLibrary(lib + ffi.LIB_EXT)
    assert(handle instanceof DynamicLibrary)
  })

  describe('get()', function () {

    it('should return a "pointer" Buffer to a symbol', function () {
      var lib = process.platform == 'win32' ? 'msvcrt' : 'libc'
      var handle = DynamicLibrary(lib + ffi.LIB_EXT)
      var symbol = handle.get('free')
      assert(Buffer.isBuffer(symbol))
      assert.equal(0, symbol.length)
    })

    it('should set the "name" property to the name of the symbol', function () {
      var lib = process.platform == 'win32' ? 'msvcrt' : 'libc'
      var handle = DynamicLibrary(lib + ffi.LIB_EXT)
      var name = 'free'
      var symbol = handle.get(name)
      assert.equal(name, symbol.name)
    })

    it('should load libraries when pathname contains unicode characters', function() {
      var lib = path.join(__dirname, 'build\\Release\\ffi_tests.node') // .node file is just a dynamic library
      var toLib = path.join(__dirname, 'build\\Release\\sárgarigómadarfészekazalegszebbakirészeg\\ffi_tests.node')
      fs.copySync(lib, toLib);
      var handle = DynamicLibrary(toLib)
      var name = '_register_ffi_tests_'
      var symbol = handle.get(name)
      assert.equal(name, symbol.name)
    })

  })

})
