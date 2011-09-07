var ffi = require('../')
  , assert = require('assert')

// TODO: build struct examples statically as part of the build and expose
// via the bindings interface.

var test1 = ffi.Struct([
    ['int32', 'a']
  , ['int32', 'b']
  , ['double', 'c']
])
inspect(test1, 16, [0,4,8])

var test2 = ffi.Struct([
    ['int32', 'a']
  , ['double', 'b']
  , ['int32', 'c']
])
inspect(test2, 24, [0,8,16])

var test3 = ffi.Struct([
    ['double', 'a']
  , ['int32', 'b']
  , ['int32', 'c']
])
inspect(test3, 16, [0,8,12])

var test4 = ffi.Struct([
    ['double', 'a']
  , ['double', 'b']
  , ['int32', 'c']
])
inspect(test4, 24, [0,8,16])

var test5 = ffi.Struct([
    ['int32', 'a']
  , ['double', 'b']
  , ['double', 'c']
])
inspect(test5, 24, [0,8,16])

var test6 = ffi.Struct([
    ['char', 'a']
  , ['short','b']
  , ['int32','c']
])
inspect(test6, 8, [0,2,4])

var test7 = ffi.Struct([
    ['int32','a']
  , ['short','b']
  , ['char', 'c']
])
inspect(test7, 8, [0,4,6])

var test8 = ffi.Struct([
    ['int32','a']
  , ['short','b']
  , ['char', 'c']
  , ['char', 'd']
])
inspect(test8, 8, [0,4,6,7])

var test9 = ffi.Struct([
    ['int32','a']
  , ['short','b']
  , ['char', 'c']
  , ['char', 'd']
  , ['char', 'e']
])
inspect(test9, 12, [0,4,6,7,8])

var test10 = ffi.Struct([
    [test1, 'a']
  , ['char','b']
])
inspect(test10, 24, [0,16])

var ffi_type = ffi.Struct([
    ['size_t','size']
  , ['ushort','alignment']
  , ['ushort','type']
  , ['pointer','elements']
])
if (ffi.Bindings.POINTER_SIZE == 4) {
  inspect(ffi_type, 12, [0,4,6,8])
}
else if (ffi.Bindings.POINTER_SIZE == 8) {
  inspect(ffi_type, 24, [0,8,10,16])
}
else {
  console.log("Bad platform pointer size: %d bytes", PSZ);
}

function inspect (s, expectedSize, expectedOffsets) {
  var info = s.__structInfo__
    , props = info.struct
    , types = []
  Object.keys(props).forEach(function (p) {
    var t = props[p].type
    if (typeof t == 'function') t = 'Struct'
    types.push(t)
  })
  console.log('sizeof(%s): %d', types.join(', '), ffi.sizeOf(s))
  Object.keys(props).forEach(function (p) {
    var t = props[p].type
    if (typeof t == 'function') t = 'Struct'
    console.log('  %s: %d', t, props[p].offset)
  })
  console.log()
  // do assert tests
  assert.equal(expectedSize, info.size)
  Object.keys(props).forEach(function (p, i) {
    assert.equal(expectedOffsets[i], props[p].offset)
  })
}

console.log("All tests passed!");
