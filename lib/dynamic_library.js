
/**
 * Module dependencies.
 */

var ForeignFunction = require('./foreign_function')
  , assert = require('assert')
  , debug = require('debug')('ffi:DynamicLibrary')
  , funcs = require('./bindings').StaticFunctions
  , ref = require('ref')
  , read  = require('fs').readFileSync

// typedefs
var int = ref.types.int
  , charPtr = ref.refType(ref.types.char)
  , voidPtr = ref.refType(ref.types.void)

var dlopen  = ForeignFunction(funcs.dlopen,  voidPtr, [ charPtr, int ])
  , dlclose = ForeignFunction(funcs.dlclose, int,     [ voidPtr ])
  , dlsym   = ForeignFunction(funcs.dlsym,   voidPtr, [ voidPtr, charPtr ])
  , dlerror = ForeignFunction(funcs.dlerror, charPtr, [ ])

/**
 * `DynamicLibrary` loads and fetches function pointers for dynamic libraries
 * (.so, .dylib, etc). After the libray's function pointer is acquired, then you
 * call `get(symbol)` to retreive a pointer to an exported symbol. You need to
 * call `get___()` on the pointer to dereference it into it's acutal value, or
 * turn the pointer into a callable function with `ForeignFunction`.
 */

function DynamicLibrary (path, mode) {
  if (!(this instanceof DynamicLibrary)) {
    return new DynamicLibrary(path, mode)
  }

  debug('new DynamicLibrary()', path, mode)

  if (typeof path === 'string') {
    path = ref.allocCString(path)
  } else if (!path) {
    path = ref.NULL
  }

  if (typeof mode === 'undefined') {
    mode = DynamicLibrary.FLAGS.RTLD_NOW
  }

  assert(Buffer.isBuffer(path))
  assert.equal('number', typeof mode)

  this._handle = dlopen(path, mode)

  assert(Buffer.isBuffer(this._handle), 'expected a Buffer instance to be returned from `dlopen()`')

  if (this._handle.isNull()) {
    var err = this.error()

    // THIS CODE IS BASED ON GHC Trac ticket #2615
    // http://hackage.haskell.org/trac/ghc/attachment/ticket/2615

    // On some systems (e.g., Gentoo Linux) dynamic files (e.g. libc.so)
    // contain linker scripts rather than ELF-format object code. This
    // code handles the situation by recognizing the real object code
    // file name given in the linker script.

    // If an "invalid ELF header" error occurs, it is assumed that the
    // .so file contains a linker script instead of ELF object code.
    // In this case, the code looks for the GROUP ( ... ) linker
    // directive. If one is found, the first file name inside the
    // parentheses is treated as the name of a dynamic library and the
    // code attempts to dlopen that file. If this is also unsuccessful,
    // an error message is returned.

    // see if the error message is due to an invalid ELF header
    var match

    if (match = err.match(/^(([^ \t()])+\.so([^ \t:()])*):([ \t])*invalid ELF header$/)) {
      var content = read(match[1], 'ascii')
      // try to find a GROUP ( ... ) command
      if (match = content.match(/GROUP *\( *(([^ )])+)/)){
        return DynamicLibrary.call(this, match[1], mode)
      }
    }

    throw new Error('Dynamic Linking Error: ' + err)
  }
}
module.exports = DynamicLibrary

/**
 * See "dlfcn.h"
 */

DynamicLibrary.FLAGS = {
    'RTLD_LAZY':   0x1
  , 'RTLD_NOW':    0x2
  , 'RTLD_LOCAL':  0x4
  , 'RTLD_GLOBAL': 0x8
}

/**
 * Close this library, returns the result of the dlclose() system function.
 */

DynamicLibrary.prototype.close = function () {
  debug('dlclose()')
  return dlclose(this._handle)
}

/**
 * Get a symbol from this library, returns a Pointer for (memory address of) the symbol
 */

DynamicLibrary.prototype.get = function (symbol) {
  debug('dlsym()', symbol)

  if (typeof symbol === 'string') {
    symbol = ref.allocCString(symbol)
  }

  assert(Buffer.isBuffer(symbol))
  var ptr = dlsym(this._handle, symbol)
  assert(Buffer.isBuffer(ptr))

  if (ptr.isNull()) {
    throw new Error('Dynamic Symbol Retrieval Error: ' + this.error())
  }

  return ptr
}

/**
 * Returns the result of the dlerror() system function
 */

DynamicLibrary.prototype.error = function error () {
  debug('dlerror()')
  return dlerror().readCString()
}
