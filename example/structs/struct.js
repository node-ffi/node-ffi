var FFI = require("../../lib/ffi");

var Test = FFI.Struct([
    ['int32', 'a']
  , ['double', 'b']
  , ['string', 'c']
]);

var libstruct = new FFI.Library("./libstruct", {
    test_struct_arg_by_value: [ 'double', [ Test ] ]
  , test_struct_rtn_by_value: [ Test, [ ] ]
});

var output = libstruct.test_struct_rtn_by_value()

console.log(output.a)
console.log(output.b)
console.log(output.c)

libstruct.test_struct_arg_by_value(output)
