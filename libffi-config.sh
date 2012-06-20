cd deps/libffi
if [[ "$OSTYPE" == "msys" ]]; then
  export CC="`pwd`/msvcc.sh"
  export LD="link"
  export CPP="cl -nologo -EP"
  export CFLAGS=""
fi
make clean distclean >node_ffi_configure.out 2>&1
sh configure --enable-static --disable-shared --disable-builddir --with-pic >>node_ffi_configure.out 2>&1
cd ../..
