
var ref = require('ref')
var assert = require('assert')
var bindings = require('./build/Release/ffi_bindings')

var intType = bindings.FFI_TYPES.int

var absPtr = bindings.StaticFunctions.abs

var cif = new Buffer(bindings.FFI_CIF_SIZE)

var numArgs = 1

var arg_types = new Buffer(ref.sizeof.pointer * numArgs)
arg_types.writePointer(intType, 0)

var abi = bindings.FFI_DEFAULT_ABI

var _result = bindings.ffi_prep_cif(cif, numArgs, intType, arg_types, abi)
assert(_result === bindings.FFI_OK)

var result = new Buffer(bindings.FFI_ARG_SIZE)

var arg_values = new Buffer(ref.sizeof.pointer * numArgs)
arg_values.writePointer(ref.alloc(ref.types.int, -50), 0)

bindings.ffi_call(cif, absPtr, result, arg_values)
assert.equal(50, result.readInt32LE(0))
