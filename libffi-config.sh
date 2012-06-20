#!/bin/sh

cd deps/libffi
if [ "x$OSTYPE" = "xmsys" ]; then
  export CC="`pwd`/msvcc.sh"
  export LD="link"
  export CPP="cl -nologo -EP"
  export CFLAGS=""
fi
make clean distclean >node_ffi_configure.out 2>&1
sh configure --enable-static --disable-shared --disable-builddir --with-pic >>node_ffi_configure.out 2>&1
if [ "x$OSTYPE" = "xmsys" ]; then
  # need to invoke "make" immediately on windows (instead of during `build`)
  make >node_ffi_build.out 2>&1
  echo $? >>node_ffi_build.out
fi
cd ../..
