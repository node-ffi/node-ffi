
var ref = require('ref')
var ffi = module.exports

ffi.Bindings = require('bindings')('ffi_bindings.node')


/**
 * The extension to use on libraries.
 * i.e.  libm  ->  libm.so   on linux
 */

Object.defineProperty(ffi, 'LIB_EXT', {
    configurable: true
  , enumerable: true
  , value: {
        'linux':  '.so'
      , 'linux2': '.so'
      , 'sunos':  '.so'
      , 'solaris':'.so'
      , 'darwin': '.dylib'
      , 'mac':    '.dylib'
      , 'win32':  '.dll'
    }[process.platform]
}

// Direct exports from the bindings
ffi.CallbackInfo = ffi.Bindings.CallbackInfo

// Include our other modules
ffi.CIF = require('./cif')
ffi.ForeignFunction = require('./foreign_function')
ffi.DynamicLibrary = require('./dynamic_library')
ffi.Library = require('./library')
ffi.Callback = require('./callback')
ffi.Struct = require('./struct')
ffi.errno = require('./errno')

/**
 * Define the `FFI_TYPE` struct for use in JS.
 * This struct type is used internally to define custom struct rtn/arg types.
 */

ffi.FFI_TYPE = ffi.Struct(
    [ ref.types.size_t, 'size']
  , [ ref.types.ushort, 'alignment']
  , [ ref.types.ushort, 'type']
  , [ 'pointer' ,'elements']
)
