
var expect = require('expect.js')
  , assert = require('assert')
  , ref = require('ref')
  , Struct = require('ref-struct')
  , ffi = require('../')
  , bindings = require('./build/Release/ffi_tests')

describe('ForeignFunction', function () {

  afterEach(gc)

  // same struct as defined in ffi_tests.cc
  var box = Struct({
      width: ref.types.int
    , height: ref.types.int
  })

  it('should call the static "abs" bindings', function () {
    var _abs = bindings.abs
    var abs = ffi.ForeignFunction(_abs, 'int', [ 'int' ])
    expect(abs).to.be.a('function')
    expect(abs(-1234)).to.equal(1234)
  })

  it('should call the static "atoi" bindings', function () {
    var _atoi = bindings.atoi
    var atoi = ffi.ForeignFunction(_atoi, 'int', [ 'string' ])
    expect(atoi).to.be.a('function')
    expect(atoi('1234')).to.equal(1234)
  })

  it('should call the static "double_box" bindings', function () {
    var double_box = ffi.ForeignFunction(bindings.double_box, box, [ box ])
    var b = new box
    assert(b instanceof box)
    b.width = 4
    b.height = 5
    var out = double_box(b)
    // double_box writes to its input "box" struct, so make sure that the one we
    // passed in remains unaffected (since we passed it in by value, not pointer)
    assert.equal(4, b.width)
    assert.equal(5, b.height)
    assert(out instanceof box)
    assert.equal(8, out.width)
    assert.equal(10, out.height)
    assert.notEqual(b.ref().address(), out.ref().address())
  })

  it('should call the static "double_box_ptr" bindings', function () {
    var boxPtr = ref.refType(box)
    var double_box_ptr = ffi.ForeignFunction(bindings.double_box_ptr, box, [ boxPtr ])
    var b = new box
    b.width = 4
    b.height = 5
    var out = double_box_ptr(b.ref())
    // double_box_ptr writes to its input "box" struct, so make sure that the one
    // we passed in has it's values changed (since we passed it in by pointer)
    assert.equal(8, b.width)
    assert.equal(10, b.height)
    assert(out instanceof box)
    assert.equal(8, out.width)
    assert.equal(10, out.height)
    assert.notEqual(b.ref().address(), out.ref().address())
  })

  it('should call the static "area_box" bindings', function () {
    var area_box = ffi.ForeignFunction(bindings.area_box, ref.types.int, [ box ])
    var b = new box({ width: 5, height: 20 })
    var rtn = area_box(b)
    assert.equal('number', typeof rtn)
    assert.equal(100, rtn)
  })

  it('should call the static "area_box_ptr" bindings', function () {
    var boxPtr = ref.refType(box)
    var area_box = ffi.ForeignFunction(bindings.area_box_ptr, ref.types.int, [ boxPtr ])
    var b = new box({ width: 5, height: 20 })
    var rtn = area_box(b.ref())
    assert.equal('number', typeof rtn)
    assert.equal(100, rtn)
  })

  it('should call the static "create_box" bindings', function () {
    var create_box = ffi.ForeignFunction(bindings.create_box, box, [ 'int', 'int' ])
    var rtn = create_box(1, 2)
    assert(rtn instanceof box)
    assert.equal(1, rtn.width)
    assert.equal(2, rtn.height)
  })

  it('should call the static "add_boxes" bindings', function () {
    var count = 3
    var boxes = new Buffer(box.size * count)
    box.set(boxes, box.size * 0, { width: 1, height: 10 })
    box.set(boxes, box.size * 1, { width: 2, height: 20 })
    box.set(boxes, box.size * 2, { width: 3, height: 30 })
    var boxPtr = ref.refType(box)
    var add_boxes = ffi.ForeignFunction(bindings.add_boxes, box, [ boxPtr, 'int' ])
    var rtn = add_boxes(boxes, count)
    assert(rtn instanceof box)
    assert.equal(6, rtn.width)
    assert.equal(60, rtn.height)
  })

  describe('async', function () {

    it('should call the static "abs" bindings asynchronously', function (done) {
      var _abs = bindings.abs
      var abs = ffi.ForeignFunction(_abs, 'int', [ 'int' ])
      expect(abs).to.be.a('function')

      // invoke asynchronously
      abs.async(-1234, function (err, res) {
        expect(err).to.equal(null)
        expect(res).to.equal(1234)
        done()
      })
    })

  })

})
