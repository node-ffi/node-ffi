
var expect = require('expect.js')
  , ref = require('ref')
  , ffi = require('../')
  , voidPtr = ref.refType(ref.types.void)

// these are "opaque" pointer types, so we only care about the memory addess,
// and not the contents (which are internal to Apple). Therefore we can typedef
// these opaque types to `void *` and it's essentially the same thing.
var id = voidPtr
  , SEL = voidPtr
  , Class = voidPtr

if (ffi.HAS_OBJC) {

  describe('@try / @catch', function () {

    afterEach(gc)

    var objcLib = new ffi.Library('libobjc', {
        'objc_msgSend': [ id, [ id, SEL ] ]
      , 'objc_getClass': [ Class, [ 'string' ] ]
      , 'sel_registerName': [ SEL, [ 'string' ] ]
    })

    // create an NSAutoreleasePool instance
    var NSAutoreleasePool = objcLib.objc_getClass('NSAutoreleasePool')
      , sel_new = objcLib.sel_registerName('new')
      , pool = objcLib.objc_msgSend(NSAutoreleasePool, sel_new)

    it('should proxy @try/@catch to JavaScript via try/catch/throw', function () {
      var sel_retain = objcLib.sel_registerName('retain')
      expect(function () {
        objcLib.objc_msgSend(pool, sel_retain)
      }).to.throwException()
    })

    it('should throw a Buffer instance when an exception happens', function () {
      var sel_retain = objcLib.sel_registerName('retain')
      try {
        objcLib.objc_msgSend(pool, sel_retain)
        expect(false).to.be(true)
      } catch (e) {
        expect(Buffer.isBuffer(e)).to.be(true)
        expect(e.isNull()).to.be(false)
        expect(e.address()).to.be.greaterThan(0)
      }
    })

  })

}
