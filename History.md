
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
