
1.1.2 / 2012-09-16
==================

 - callback: throw an Error if the callback function has been garbage collected
 - test: 100% tests passing on Windows!

1.1.1 / 2012-09-16
==================

 - libffi: define "FFI_MMAP_EXEC_WRIT" on OS X (#71)
 - added a new test case that calls a callback function directly (#72)

1.1.0 / 2012-09-11
==================

 - properly "gyp-ify" libffi
   - added "libffi.gyp"
   - no more "hacks" in binding.gyp
   - no need for MozillaBuild on Windows anymore!

1.0.7 / 2012-08-03
==================

 - export `FFI_FIRST_ABI`
 - export abi_enum values for ARM processors (100% tests passing on Raspberry Pi!)

1.0.6 / 2012-07-22
==================

 - VariadicForeignFunction: apply a tweak to prevent false positives on ffi id's

1.0.5 / 2012-07-22
==================

 - DynamicLibrary: use 'string' instead of "char *"
 - DynamicLibrary: set the "name" property of the returned Buffer when get() is called
 - test: add some "DynamicLibrary" tests
 - VariadicForeignFunction: quick hack fix for the key caching name collision

1.0.4 / 2012-07-12
==================

 - exit early when not compiling from within a MozillaBuild window on Windows

1.0.3 / 2012-07-9
=================

 - refactor the README
 - fix deprecation warning for using the `Utf8String` type (renamed to `CString`)
 - remove circular `require()` calls (Justin Freitag)
 - use the node-gyp `--directory` flag for `npm test` command

1.0.2 / 2012-06-20
==================

 - Fix Windows build (32-bit at least). Fixes #51.

1.0.1 / 2012-06-13
==================

 - Refactor the variadic function generator to allow for an overridden "returnType"

1.0.0 / 2012-05-31
==================

  - Add a `VariadicForeignFunction` function for vararg C functions
  - Various cleanup
  - Don't export the native bindings (`ffi.Bindings` is gone)
  - Use the `ref()` function when available, then fall back to `ref.alloc()`
  - Add a few more tests

1.0.0-alpha1 / 2012-05-29
=========================

 - Readme improvements
 - Node >= v0.7.9 compatability

1.0.0-alpha / 2012-05-25
========================

 - Alpha release of v1.0.0

< 1.0.0
=======

 - Prehistoric: see `git log`
