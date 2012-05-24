
if [ `getconf LONG_BIT` -eq 64 ]; then
  CFLAGS="-fPIC"
fi

cd deps/libffi
make clean distclean >node_ffi_configure.out 2>&1
sh configure --enable-static --disable-shared --disable-builddir CFLAGS="$CFLAGS" >>node_ffi_configure.out 2>&1
cd ../..
