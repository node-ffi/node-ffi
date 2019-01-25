2.2.0 / 2016-10-29
==================

* [[`8fc355f276`](https://github.com/node-ffi/ffi/commit/8fc355f276)] - add libffi `version` string (Nathan Rajlich)
* [[`97d7ab12e6`](https://github.com/node-ffi/ffi/commit/97d7ab12e6)] - remove OS X 10.5 deployment target (Nathan Rajlich)
* [[`7a928f38b1`](https://github.com/node-ffi/ffi/commit/7a928f38b1)] - **test**: add a test case for [TooTallNate/ref#56](https://github.com/TooTallNate/ref/issues/56) (Nathan Rajlich)

2.1.0 / 2016-08-03
==================

* [[`a66fb8b282`](https://github.com/node-ffi/ffi/commit/a66fb8b282)] - rename History.md to CHANGELOG.md (Nathan Rajlich)
* [[`424d6b2278`](https://github.com/node-ffi/ffi/commit/424d6b2278)] - test node v6 with CI (Nathan Rajlich)
* [[`37dc33f10d`](https://github.com/node-ffi/ffi/commit/37dc33f10d)] - Move `errno` method implement to C++ side (Lee, SungUk)
* [[`f0547a7535`](https://github.com/node-ffi/ffi/commit/f0547a7535)] - **test**: use full URL to issue (Nathan Rajlich)
* [[`819c664605`](https://github.com/node-ffi/ffi/commit/819c664605)] - **appveyor, travis**: test node v5.1 (Nathan Rajlich)
* [[`b6e8dba046`](https://github.com/node-ffi/ffi/commit/b6e8dba046)] - remove benchmark files (Nathan Rajlich)
* [[`f5e445be91`](https://github.com/node-ffi/ffi/commit/f5e445be91)] - **test**: load Foundation first instead (Nathan Rajlich)
* [[`529ea78029`](https://github.com/node-ffi/ffi/commit/529ea78029)] - **travis**: remove iojs v3 (Nathan Rajlich)
* [[`c81ab1ed1e`](https://github.com/node-ffi/ffi/commit/c81ab1ed1e)] - **test**: load `Cocoa` lib for Obj-C tests (Nathan Rajlich)
* [[`829d7dac02`](https://github.com/node-ffi/ffi/commit/829d7dac02)] - **travis**: attempt to test "osx" (Nathan Rajlich)
* [[`979da99892`](https://github.com/node-ffi/ffi/commit/979da99892)] - **test**: fix hardcoded `strtoul()` bindings (Nathan Rajlich)
* [[`9cc558632c`](https://github.com/node-ffi/ffi/commit/9cc558632c)] - **test**: fix comment (Nathan Rajlich)
* [[`3d673ca2a1`](https://github.com/node-ffi/ffi/commit/3d673ca2a1)] - **test**: attempt to fix test 169 on Linux (Nathan Rajlich)
* [[`c2e5996d9d`](https://github.com/node-ffi/ffi/commit/c2e5996d9d)] - **test**: remove .only() (Nathan Rajlich)
* [[`1187b80f7b`](https://github.com/node-ffi/ffi/commit/1187b80f7b)] - **test**: add case for allowing Buffer backing store for "string" FFI argument (Nathan Rajlich)
* [[`3b09d1ac09`](https://github.com/node-ffi/ffi/commit/3b09d1ac09)] - **test**: remove semis (Nathan Rajlich)
* [[`74e29a17d0`](https://github.com/node-ffi/ffi/commit/74e29a17d0)] - **test**: whitespace fixes (Nathan Rajlich)
* [[`6551d4ab5b`](https://github.com/node-ffi/ffi/commit/6551d4ab5b)] - **appveyor**: test node v4.1 (Nathan Rajlich)
* [[`c0b64413fe`](https://github.com/node-ffi/ffi/commit/c0b64413fe)] - **travis**: test node v4.1 (Nathan Rajlich)
* [[`730bd4a92f`](https://github.com/node-ffi/ffi/commit/730bd4a92f)] - **travis**: drop "iojs-" prefix from version names (Nathan Rajlich)
* [[`0324f3be9c`](https://github.com/node-ffi/ffi/commit/0324f3be9c)] - test node v0.4 (Nathan Rajlich)
* [[`f3e393bb55`](https://github.com/node-ffi/ffi/commit/f3e393bb55)] - remove node v0.8 from testing matrices (Nathan Rajlich)

2.0.0 / 2015-09-04
==================

  * update to "nan" v2, adds io.js v3 support
  * replace "dlfcn-win32" with "simple-dlfcn-win32" (uses MIT license rather than LGPL, #226, @mcnameej)
  * remove compiled binary file from libffi deps dir (#229, @fredericgermain)
  * fix dynamic linking when locale is not English (#224, @unbornchikken)
  * appveyor: test v0.8, io.js v2.5 and v3
  * travis: test v0.8, and iojs v2.5 and v3
  * package: add "license" field
  * package: add Gábor to LICENSE and "contributors"
  * package: move TooTallNate to "contributors" array

1.3.2 / 2015-07-31
==================

  * package: made the nan dependency stricter (#217, @feldgendler)
  * package: reflect the fact that the build fails for node <= 0.8 (#196, @addaleax)

1.3.1 / 2015-04-16
==================

  * test: use `assert.throws()` for Obj-C test cases
  * test: add case for #199 that covers callback and error propagation on non-libuv thread
  * HandleScope issue fix for iojs v1.7+
  * use Windows' native thread API, rather than libuv

1.3.0 / 2015-03-22
==================

  * add appveyor.yml file for Windows testing
  * add support for io.js >= v1.1.0 and node.js v0.12.x via nan
  * avoid VS build error LNK2005
  * package: allow any "debug" v2
  * package: update github URLs for new repo location
  * travis: don't test node v0.6, test v0.12
  * now using libuv's pthread impl on Windows, removed `pthreads-win32` dep
  * `dlfcn-win32` dep updated to fix process global symbols on Windows
  * README: add appveyor build badge
  * README: use SVG appveyor badge

1.2.7 / 2014-07-06
==================

  * test: add test case for race condition in #153
  * factorial: fix Windows build instructions
  * example: turn factorial readme to Markdown
  * example: add Windows libfactorial.dll compile command
  * package: remove "expect.js" dev dependency
  * test: remove final `expect.js` usage
  * jshintrc: enable "laxbreak"
  * travis: remove IRC notifications from Travis
  * test: properly re-add Mocha's uncaught listeners
  * test: add a try/catch test after the callback is GC'd
  * src: fix race condition when callback is invoked from thread pool (@nikmikov, #154)
  * change Node.js versions used on Travis CI for testing (@Mithgol, #151)
  * use SVG to display Travis CI build testing status (@Mithgol, #149)

1.2.6 / 2013-10-08
==================

  * just a minor documentation typo fix (Jason May, #126)
  * example: fix "factorial" example on Windows (#127)
  * package: add "keywords" section
  * callback: store a reference to the CIF struct on the ffi closure Buffer instance (#125)

1.2.5 / 2013-04-06
==================

  * type: make detecting "long" and "ulong" ffi_types work
  * travis: don't test node v0.7.x, test node v0.10.x

1.2.4 / 2013-02-18
==================

  * FreeBSD 32-bit support (Dave Osborne)
  * libffi: don't build libffi as a "thin" archive (CentOS 5 support, #110)

1.2.3 / 2012-12-20
==================

  * FreeBSD 64-bit support (Dave Osborne)

1.2.2 / 2012-12-15
==================

  * fix nasty bug in async FFI'd function on node v0.9.x

1.2.1 / 2012-12-15
==================

  * add node >= v0.9.4 support

1.2.0 / 2012-10-13
==================

  * type: full support for "ref-array" arguments and return types
  * type: add basic support for basic ref types without a `ffi_type` prop set
  * don't call the "ref()" function on passed in arguments
  * libffi: fix unused variable warnings
  * add `Function` "type" for functions/callbacks that accept/return C Functions
  * dynamic_library: use RTLD_LAZY by default
  * export all the RTLD_* symbols from the native binding
  * foreign_function: better error messages when a type's "set()" function throws
  * callback: make catching callbacks that throw JS exceptions work as expected
  * callback: more meaningful error message when a type's "set()" function throws
  * callback: fix pointer return values

1.1.3 / 2012-09-25
==================

  * callback: use `IsEmpty()` instead of an explicit NULL check
  * test: use "bindings" to load the bindings for the variadic tests
  * ffi: use HandleScope in WrapPointer() (fixes ffi calls in a tight loop, see #74)
  * test: fix typo in test name
  * libffi: disable the C4267 implicit conversion warnings on Windows
  * libffi: remove "as.bat" from the gyp file

1.1.2 / 2012-09-16
==================

  * callback: throw an Error if the callback function has been garbage collected
  * test: 100% tests passing on Windows!

1.1.1 / 2012-09-16
==================

  * libffi: define "FFI_MMAP_EXEC_WRIT" on OS X (#71)
  * added a new test case that calls a callback function directly (#72)

1.1.0 / 2012-09-11
==================

  * properly "gyp-ify" libffi
   - added "libffi.gyp"
   - no more "hacks" in binding.gyp
   - no need for MozillaBuild on Windows anymore!

1.0.7 / 2012-08-03
==================

  * export `FFI_FIRST_ABI`
  * export abi_enum values for ARM processors (100% tests passing on Raspberry Pi!)

1.0.6 / 2012-07-22
==================

  * VariadicForeignFunction: apply a tweak to prevent false positives on ffi id's

1.0.5 / 2012-07-22
==================

  * DynamicLibrary: use 'string' instead of "char *"
  * DynamicLibrary: set the "name" property of the returned Buffer when get() is called
  * test: add some "DynamicLibrary" tests
  * VariadicForeignFunction: quick hack fix for the key caching name collision

1.0.4 / 2012-07-12
==================

  * exit early when not compiling from within a MozillaBuild window on Windows

1.0.3 / 2012-07-9
=================

  * refactor the README
  * fix deprecation warning for using the `Utf8String` type (renamed to `CString`)
  * remove circular `require()` calls (Justin Freitag)
  * use the node-gyp `--directory` flag for `npm test` command

1.0.2 / 2012-06-20
==================

  * Fix Windows build (32-bit at least). Fixes #51.

1.0.1 / 2012-06-13
==================

  * Refactor the variadic function generator to allow for an overridden "returnType"

1.0.0 / 2012-05-31
==================

  * Add a `VariadicForeignFunction` function for vararg C functions
  * Various cleanup
  * Don't export the native bindings (`ffi.Bindings` is gone)
  * Use the `ref()` function when available, then fall back to `ref.alloc()`
  * Add a few more tests

1.0.0-alpha1 / 2012-05-29
=========================

  * Readme improvements
  * Node >= v0.7.9 compatability

1.0.0-alpha / 2012-05-25
========================

  * Alpha release of v1.0.0

< 1.0.0
=======

  * Prehistoric: see `git log`
