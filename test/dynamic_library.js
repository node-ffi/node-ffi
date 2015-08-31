
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
      // Directory and file names are "I can't read this" and "Or this"
      // translated into Simplified Chinese by Google Translate
      var lib = path.join(__dirname, 'build', 'Release', 'ffi_tests.node') // .node file is just a dynamic library
      var toDir = path.join(__dirname, 'build', 'Release', String.fromCharCode(0x6211, 0x65e0, 0x6cd5, 0x9605, 0x8bfb))
      var toLib = path.join(toDir, String.fromCharCode(0x6216, 0x8005, 0x8fd9) + '.node')
      fs.mkdirsSync(toDir);
      fs.copySync(lib, toLib);
      var handle = DynamicLibrary(toLib)
      var name = 'ExportedFunction'
      var symbol = handle.get(name)
      assert.equal(name, symbol.name)
    })

  })

})
