
var expect = require('expect.js')
  , ffi = require('../')
  , Library = ffi.Library

describe('Library', function () {

  afterEach(gc)

  it('should be a function', function () {
    expect(Library).to.be.a('function')
  })

  it('should work with the `new` operator', function () {
    var l = new Library()
      , test = l instanceof Library
    expect(test).to.be.true
  })

  it('should accept `null` as a first argument', function () {
    var thisFuncs = new Library(null, {
      'printf': [ 'void', [ 'string' ] ]
    })
    var test1 = thisFuncs instanceof Library
      , test2 = thisFuncs.printf instanceof Function
    expect(test1).to.be.true
    expect(test2).to.be.true
  })

  it('should accept a lib name as a first argument', function () {
    var libm = new Library('libm', {
        'ceil': [ 'double', [ 'double' ] ]
    })
    var test1 = libm instanceof Library
      , test2 = libm.ceil instanceof Function
    expect(test1).to.be.true
    expect(test2).to.be.true
    expect(libm.ceil(1.1)).to.equal(2)
  })

  it('should throw when an invalid function name is used', function () {
    expect(function () {
      new Library(null, {
          'doesnotexist__': [ 'void', [] ]
      })
    }).to.throwException()
  })

  it('should work with "strcpy" and a 128 length string', function () {
    var ZEROS_128 = Array(128 + 1).join('0')
    var buf = new ffi.Pointer(256)
    var strcpy = new Library(null, {
        'strcpy': [ 'pointer', [ 'pointer', 'string' ] ]
    }).strcpy
    strcpy(buf, ZEROS_128)
    expect(buf.getCString()).to.equal(ZEROS_128)
  })

  it('should work with "strcpy" and a 2k length string', function () {
    var ZEROS_2K = Array(2e3 + 1).join('0')
    var buf = new ffi.Pointer(4096)
    var strcpy = new Library(null, {
        'strcpy': [ 'pointer', [ 'pointer', 'string' ] ]
    }).strcpy
    strcpy(buf, ZEROS_2K)
    expect(buf.getCString()).to.equal(ZEROS_2K)
  })

  describe('async', function () {

    it('should call a function asynchronously', function (done) {
      var libm = new Library('libm', {
          'ceil': [ 'double', [ 'double' ], { async: true } ]
      })
      libm.ceil(1.1).on('success', function (res) {
        expect(res).to.equal(2)
        done()
      })
    })

  })

})
