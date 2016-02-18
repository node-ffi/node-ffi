#!/bin/sh
WIN32_CC="bash msvcc.sh -DUSE_STATIC_RTL"
WIN64_CC="bash msvcc.sh -m64 -DUSE_STATIC_RTL"
CPP="cl -nologo -EP"
CONFIG_OPTS=" --disable-builddir  --enable-static --disable-shared --with-pic"
ASM_OPTS="-I. -I./include -Iinclude -I./src -DHAVE_CONFIG_H -DPIC"
ASM_WIN32_OPTS="-DX86_WIN32"
ASM_WIN64_OPTS="-DX86_WIN64"

FFI_COMPLEX="FFI_TARGET_HAS_COMPLEX_TYPE"
MSC_VER=1900
COMPLEX_DEFINE="s/^#define $FFI_COMPLEX/&\n#if defined(_MSC_VER) \&\& _MSC_VER < $MSC_VER\n#undef $FFI_COMPLEX\n#endif/"


### x64
./configure CC="$WIN64_CC" CXX="$WIN64_CC" CPP="$CPP" CXXCPP="$CPP" LD=link $CONFIG_OPTS \
    --build=x86_64-unknown-cygwin --host=x86_64-unknown-cygwin
# disable FFI_TARGET_HAS_COMPLEX_TYPE
sed -i.bak -e "$COMPLEX_DEFINE" include/ffitarget.h
$CPP $ASM_OPTS $ASM_WIN64_OPTS src/x86/win64.S > src/x86/win64.asm
# replace `jmp SHORT` to `jmp`
sed -i.bak -e "s/jmp\tSHORT /jmp\t/g" src/x86/win64.asm
mv fficonfig.h include/ffi.h include/ffitarget.h windows/x64/

### x86
./configure CC="$WIN32_CC" CXX="$WIN32_CC" CPP="$CPP" CXXCPP="$CPP" LD=link $CONFIG_OPTS \
    --build=i686-unknown-cygwin --host=i686-unknown-cygwin
# disable FFI_TARGET_HAS_COMPLEX_TYPE
sed -i.bak -e "$COMPLEX_DEFINE" include/ffitarget.h
$CPP $ASM_OPTS $ASM_WIN32_OPTS src/x86/win32.S > src/x86/win32.asm
# replace `jmp SHORT` to `jmp`
sed -i.bak -e "s/jmp\tSHORT /jmp\t/g" src/x86/win32.asm
sed -i.bak -e "/^$/d" src/x86/win32.asm
mv fficonfig.h include/ffi.h include/ffitarget.h windows/ia32/
