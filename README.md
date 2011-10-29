# node-ffi

Rick Branson rick [at] diodeware [dot] com
http://github.com/rbranson/node-ffi

# DESCRIPTION

node-ffi is a Node.js addon for loading and calling dynamic libraries using pure JavaScript. It can be used to create bindings to native libraries without writing any C++ code.

It also simplifies the augmentation of node.js with C code as it takes care of handling the translation of types across JavaScript and C, which can add reams of boilerplate code to your otherwise simple C. See the `example/factorial` for an example of this use case.

**WARNING**: node-ffi assumes you know what you're doing. You can pretty easily create situations where you will segfault the interpreter and unless you've got C debugger skills, you probably won't know what's going on.

# EXAMPLE

``` js
var FFI = require("node-ffi");

var libm = new FFI.Library("libm", { "ceil": [ "double", [ "double" ] ] });
libm.ceil(1.5); // 2

// You can also access just functions in the current process by passing a null
var current = new FFI.Library(null, { "atoi": [ "int32", [ "string" ] ] });
current.atoi("1234"); // 1234
```

# REQUIREMENTS

* Linux, OS X, or Solaris.
* The current version is tested to run on node.js 0.4 (specifically, 0.4.12)
* libffi installed -- with development headers (comes with OS X and most Linux distros)

# NPM INSTALL

``` bash
$ npm install node-ffi
```

# SOURCE INSTALL

``` bash
$ git clone git://github.com/rbranson/node-ffi.git
$ cd node-ffi
$ node-waf configure build
$ node test.js
$ node-waf install
```

# TYPES

    int8        Signed 8-bit Integer
    uint8       Unsigned 8-bit Integer
    int16       Signed 16-bit Integer
    uint16      Unsigned 16-bit Integer
    int32       Signed 32-bit Integer
    uint32      Unsigned 32-bit Integer
    int64       Signed 64-bit Integer
    uint64      Unsigned 64-bit Integer
    float       Single Precision Floating Point Number (float)
    double      Double Precision Floating Point Number (double)
    pointer     Pointer Type
    string      Null-Terminated String (char *)

In addition to the basic types, there are type aliases for common C types.

    byte        unsigned char
    char        char
    uchar       unsigned char
    short       short
    ushort      unsigned short
    int         int
    uint        unsigned int
    long        long
    ulong       unsigned long
    longlong    long
    ulonglong   unsigned long long
    size_t      platform-dependent, usually pointer size

# V8 and 64-bit Types

Internally, V8 stores integers that will fit into a 32-bit space in a 32-bit integer, and those that fall outside of this get put into double-precision floating point numbers. This is problematic because FP numbers are imprecise. To get around this, the methods in node-ffi that deal with 64-bit integers return strings and can accept strings as parameters.

# Call Overhead

There is non-trivial overhead associated with FFI calls. Comparing a hard-coded binding version of `strtoul()` to an FFI version of `strtoul()` shows that the native hard-coded binding is 5x faster. So don't just use the C version of a function just because it's faster. There's a significant cost in FFI calls, so make them worth it.

# LICENSE

See LICENSE file.
