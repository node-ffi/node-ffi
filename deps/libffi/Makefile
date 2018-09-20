




am__is_gnu_make = test -n '$(MAKEFILE_LIST)' && test -n '$(MAKELEVEL)'
am__make_running_with_option = \
  case $${target_option-} in \
      ?) ;; \
      *) echo "am__make_running_with_option: internal error: invalid" \
              "target option '$${target_option-}' specified" >&2; \
         exit 1;; \
  esac; \
  has_opt=no; \
  sane_makeflags=$$MAKEFLAGS; \
  if $(am__is_gnu_make); then \
    sane_makeflags=$$MFLAGS; \
  else \
    case $$MAKEFLAGS in \
      *\\[\ \	]*) \
        bs=\\; \
        sane_makeflags=`printf '%s\n' "$$MAKEFLAGS" \
          | sed "s/$$bs$$bs[$$bs $$bs	]*//g"`;; \
    esac; \
  fi; \
  skip_next=no; \
  strip_trailopt () \
  { \
    flg=`printf '%s\n' "$$flg" | sed "s/$$1.*$$//"`; \
  }; \
  for flg in $$sane_makeflags; do \
    test $$skip_next = yes && { skip_next=no; continue; }; \
    case $$flg in \
      *=*|--*) continue;; \
        -*I) strip_trailopt 'I'; skip_next=yes;; \
      -*I?*) strip_trailopt 'I';; \
        -*O) strip_trailopt 'O'; skip_next=yes;; \
      -*O?*) strip_trailopt 'O';; \
        -*l) strip_trailopt 'l'; skip_next=yes;; \
      -*l?*) strip_trailopt 'l';; \
      -[dEDm]) skip_next=yes;; \
      -[JT]) skip_next=yes;; \
    esac; \
    case $$flg in \
      *$$target_option*) has_opt=yes; break;; \
    esac; \
  done; \
  test $$has_opt = yes
am__make_dryrun = (target_option=n; $(am__make_running_with_option))
am__make_keepgoing = (target_option=k; $(am__make_running_with_option))
pkgdatadir = $(datadir)/libffi
pkgincludedir = $(includedir)/libffi
pkglibdir = $(libdir)/libffi
pkglibexecdir = $(libexecdir)/libffi
am__cd = CDPATH="$${ZSH_VERSION+.}$(PATH_SEPARATOR)" && cd
install_sh_DATA = $(install_sh) -c -m 644
install_sh_PROGRAM = $(install_sh) -c
install_sh_SCRIPT = $(install_sh) -c
INSTALL_HEADER = $(INSTALL_DATA)
transform = $(program_transform_name)
NORMAL_INSTALL = :
PRE_INSTALL = :
POST_INSTALL = :
NORMAL_UNINSTALL = :
PRE_UNINSTALL = :
POST_UNINSTALL = :
build_triplet = x86_64-unknown-linux-gnu
host_triplet = x86_64-unknown-linux-gnu
target_triplet = x86_64-unknown-linux-gnu
am__append_32 = src/x86/ffi64.c src/x86/unix64.S src/x86/ffi.c src/x86/sysv.S
subdir = .
DIST_COMMON = $(srcdir)/Makefile.in $(srcdir)/Makefile.am \
 $(top_srcdir)/configure $(am__configure_deps) \
 $(srcdir)/fficonfig.h.in $(srcdir)/libffi.pc.in depcomp \
 mdate-sh $(srcdir)/doc/version.texi $(srcdir)/doc/stamp-vti \
 texinfo.tex README compile config.guess config.sub install-sh \
 missing ltmain.sh
ACLOCAL_M4 = $(top_srcdir)/aclocal.m4
am__aclocal_m4_deps = $(top_srcdir)/m4/asmcfi.m4 \
 $(top_srcdir)/m4/ax_append_flag.m4 \
 $(top_srcdir)/m4/ax_cc_maxopt.m4 \
 $(top_srcdir)/m4/ax_cflags_warn_all.m4 \
 $(top_srcdir)/m4/ax_check_compile_flag.m4 \
 $(top_srcdir)/m4/ax_compiler_vendor.m4 \
 $(top_srcdir)/m4/ax_configure_args.m4 \
 $(top_srcdir)/m4/ax_enable_builddir.m4 \
 $(top_srcdir)/m4/ax_gcc_archflag.m4 \
 $(top_srcdir)/m4/ax_gcc_x86_cpuid.m4 \
 $(top_srcdir)/m4/libtool.m4 $(top_srcdir)/m4/ltoptions.m4 \
 $(top_srcdir)/m4/ltsugar.m4 $(top_srcdir)/m4/ltversion.m4 \
 $(top_srcdir)/m4/lt~obsolete.m4 $(top_srcdir)/acinclude.m4 \
 $(top_srcdir)/configure.ac
am__configure_deps = $(am__aclocal_m4_deps) $(CONFIGURE_DEPENDENCIES) \
 $(ACLOCAL_M4)
am__CONFIG_DISTCLEAN_FILES = config.status config.cache config.log \
 configure.lineno config.status.lineno
mkinstalldirs = $(install_sh) -d
CONFIG_HEADER = fficonfig.h
CONFIG_CLEAN_FILES = libffi.pc
CONFIG_CLEAN_VPATH_FILES =
am__vpath_adj_setup = srcdirstrip=`echo "$(srcdir)" | sed 's|.|.|g'`;
am__vpath_adj = case $$p in \
    $(srcdir)/*) f=`echo "$$p" | sed "s|^$$srcdirstrip/||"`;; \
    *) f=$$p;; \
  esac;
am__strip_dir = f=`echo $$p | sed -e 's|^.*/||'`;
am__install_max = 40
am__nobase_strip_setup = \
  srcdirstrip=`echo "$(srcdir)" | sed 's/[].[^$$\\*|]/\\\\&/g'`
am__nobase_strip = \
  for p in $$list; do echo "$$p"; done | sed -e "s|$$srcdirstrip/||"
am__nobase_list = $(am__nobase_strip_setup); \
  for p in $$list; do echo "$$p $$p"; done | \
  sed "s| $$srcdirstrip/| |;"' / .*\//!s/ .*/ ./; s,\( .*\)/[^/]*$$,\1,' | \
  $(AWK) 'BEGIN { files["."] = "" } { files[$$2] = files[$$2] " " $$1; \
    if (++n[$$2] == $(am__install_max)) \
      { print $$2, files[$$2]; n[$$2] = 0; files[$$2] = "" } } \
    END { for (dir in files) print dir, files[dir] }'
am__base_list = \
  sed '$$!N;$$!N;$$!N;$$!N;$$!N;$$!N;$$!N;s/\n/ /g' | \
  sed '$$!N;$$!N;$$!N;$$!N;s/\n/ /g'
am__uninstall_files_from_dir = { \
  test -z "$$files" \
    || { test ! -d "$$dir" && test ! -f "$$dir" && test ! -r "$$dir"; } \
    || { echo " ( cd '$$dir' && rm -f" $$files ")"; \
         $(am__cd) "$$dir" && rm -f $$files; }; \
  }
am__installdirs = "$(DESTDIR)$(toolexeclibdir)" "$(DESTDIR)$(infodir)" \
 "$(DESTDIR)$(pkgconfigdir)"
LTLIBRARIES = $(noinst_LTLIBRARIES) $(toolexeclib_LTLIBRARIES)
libffi_la_LIBADD =
am__dirstamp = $(am__leading_dot)dirstamp
am_libffi_la_OBJECTS = src/prep_cif.lo src/types.lo src/raw_api.lo \
 src/java_raw_api.lo src/closures.lo
am__objects_32 = src/x86/ffi64.lo src/x86/unix64.lo \
 src/x86/ffi.lo src/x86/sysv.lo
nodist_libffi_la_OBJECTS = $(am__objects_1) $(am__objects_2) \
 $(am__objects_3) $(am__objects_4) $(am__objects_5) \
 $(am__objects_6) $(am__objects_7) $(am__objects_8) \
 $(am__objects_9) $(am__objects_10) $(am__objects_11) \
 $(am__objects_12) $(am__objects_13) $(am__objects_14) \
 $(am__objects_15) $(am__objects_16) $(am__objects_17) \
 $(am__objects_18) $(am__objects_19) $(am__objects_20) \
 $(am__objects_21) $(am__objects_22) $(am__objects_23) \
 $(am__objects_24) $(am__objects_25) $(am__objects_26) \
 $(am__objects_27) $(am__objects_28) $(am__objects_29) \
 $(am__objects_30) $(am__objects_31) $(am__objects_32) \
 $(am__objects_33) $(am__objects_34) $(am__objects_35) \
 $(am__objects_36) $(am__objects_37) $(am__objects_38) \
 $(am__objects_39) $(am__objects_40)
libffi_la_OBJECTS = $(am_libffi_la_OBJECTS) \
 $(nodist_libffi_la_OBJECTS)
AM_V_lt = $(am__v_lt_$(V))
am__v_lt_ = $(am__v_lt_$(AM_DEFAULT_VERBOSITY))
am__v_lt_0 = --silent
am__v_lt_1 = 
libffi_la_LINK = $(LIBTOOL) $(AM_V_lt) --tag=CC $(AM_LIBTOOLFLAGS) \
 $(LIBTOOLFLAGS) --mode=link $(CCLD) $(AM_CFLAGS) $(CFLAGS) \
 $(libffi_la_LDFLAGS) $(LDFLAGS) -o $@
libffi_convenience_la_LIBADD =
am__objects_41 = src/prep_cif.lo src/types.lo src/raw_api.lo \
 src/java_raw_api.lo src/closures.lo
am_libffi_convenience_la_OBJECTS = $(am__objects_41)
am__objects_42 = $(am__objects_1) $(am__objects_2) $(am__objects_3) \
 $(am__objects_4) $(am__objects_5) $(am__objects_6) \
 $(am__objects_7) $(am__objects_8) $(am__objects_9) \
 $(am__objects_10) $(am__objects_11) $(am__objects_12) \
 $(am__objects_13) $(am__objects_14) $(am__objects_15) \
 $(am__objects_16) $(am__objects_17) $(am__objects_18) \
 $(am__objects_19) $(am__objects_20) $(am__objects_21) \
 $(am__objects_22) $(am__objects_23) $(am__objects_24) \
 $(am__objects_25) $(am__objects_26) $(am__objects_27) \
 $(am__objects_28) $(am__objects_29) $(am__objects_30) \
 $(am__objects_31) $(am__objects_32) $(am__objects_33) \
 $(am__objects_34) $(am__objects_35) $(am__objects_36) \
 $(am__objects_37) $(am__objects_38) $(am__objects_39) \
 $(am__objects_40)
nodist_libffi_convenience_la_OBJECTS = $(am__objects_42)
libffi_convenience_la_OBJECTS = $(am_libffi_convenience_la_OBJECTS) \
 $(nodist_libffi_convenience_la_OBJECTS)
AM_V_P = $(am__v_P_$(V))
am__v_P_ = $(am__v_P_$(AM_DEFAULT_VERBOSITY))
am__v_P_0 = false
am__v_P_1 = :
AM_V_GEN = $(am__v_GEN_$(V))
am__v_GEN_ = $(am__v_GEN_$(AM_DEFAULT_VERBOSITY))
am__v_GEN_0 = @echo "  GEN     " $@;
am__v_GEN_1 = 
AM_V_at = $(am__v_at_$(V))
am__v_at_ = $(am__v_at_$(AM_DEFAULT_VERBOSITY))
am__v_at_0 = @
am__v_at_1 = 
DEFAULT_INCLUDES = -I. -I$(srcdir)
depcomp = $(SHELL) $(top_srcdir)/depcomp
am__depfiles_maybe = depfiles
am__mv = mv -f
CPPASCOMPILE = $(CCAS) $(DEFS) $(DEFAULT_INCLUDES) $(INCLUDES) \
 $(AM_CPPFLAGS) $(CPPFLAGS) $(AM_CCASFLAGS) $(CCASFLAGS)
LTCPPASCOMPILE = $(LIBTOOL) $(AM_V_lt) $(AM_LIBTOOLFLAGS) \
 $(LIBTOOLFLAGS) --mode=compile $(CCAS) $(DEFS) \
 $(DEFAULT_INCLUDES) $(INCLUDES) $(AM_CPPFLAGS) $(CPPFLAGS) \
 $(AM_CCASFLAGS) $(CCASFLAGS)
AM_V_CPPAS = $(am__v_CPPAS_$(V))
am__v_CPPAS_ = $(am__v_CPPAS_$(AM_DEFAULT_VERBOSITY))
am__v_CPPAS_0 = @echo "  CPPAS   " $@;
am__v_CPPAS_1 = 
COMPILE = $(CC) $(DEFS) $(DEFAULT_INCLUDES) $(INCLUDES) $(AM_CPPFLAGS) \
 $(CPPFLAGS) $(AM_CFLAGS) $(CFLAGS)
LTCOMPILE = $(LIBTOOL) $(AM_V_lt) --tag=CC $(AM_LIBTOOLFLAGS) \
 $(LIBTOOLFLAGS) --mode=compile $(CC) $(DEFS) \
 $(DEFAULT_INCLUDES) $(INCLUDES) $(AM_CPPFLAGS) $(CPPFLAGS) \
 $(AM_CFLAGS) $(CFLAGS)
AM_V_CC = $(am__v_CC_$(V))
am__v_CC_ = $(am__v_CC_$(AM_DEFAULT_VERBOSITY))
am__v_CC_0 = @echo "  CC      " $@;
am__v_CC_1 = 
CCLD = $(CC)
LINK = $(LIBTOOL) $(AM_V_lt) --tag=CC $(AM_LIBTOOLFLAGS) \
 $(LIBTOOLFLAGS) --mode=link $(CCLD) $(AM_CFLAGS) $(CFLAGS) \
 $(AM_LDFLAGS) $(LDFLAGS) -o $@
AM_V_CCLD = $(am__v_CCLD_$(V))
am__v_CCLD_ = $(am__v_CCLD_$(AM_DEFAULT_VERBOSITY))
am__v_CCLD_0 = @echo "  CCLD    " $@;
am__v_CCLD_1 = 
SOURCES = $(libffi_la_SOURCES) $(nodist_libffi_la_SOURCES) \
 $(libffi_convenience_la_SOURCES) \
 $(nodist_libffi_convenience_la_SOURCES)
DIST_SOURCES = $(libffi_la_SOURCES) $(libffi_convenience_la_SOURCES)
AM_V_DVIPS = $(am__v_DVIPS_$(V))
am__v_DVIPS_ = $(am__v_DVIPS_$(AM_DEFAULT_VERBOSITY))
am__v_DVIPS_0 = @echo "  DVIPS   " $@;
am__v_DVIPS_1 = 
AM_V_MAKEINFO = $(am__v_MAKEINFO_$(V))
am__v_MAKEINFO_ = $(am__v_MAKEINFO_$(AM_DEFAULT_VERBOSITY))
am__v_MAKEINFO_0 = @echo "  MAKEINFO" $@;
am__v_MAKEINFO_1 = 
AM_V_INFOHTML = $(am__v_INFOHTML_$(V))
am__v_INFOHTML_ = $(am__v_INFOHTML_$(AM_DEFAULT_VERBOSITY))
am__v_INFOHTML_0 = @echo "  INFOHTML" $@;
am__v_INFOHTML_1 = 
AM_V_TEXI2DVI = $(am__v_TEXI2DVI_$(V))
am__v_TEXI2DVI_ = $(am__v_TEXI2DVI_$(AM_DEFAULT_VERBOSITY))
am__v_TEXI2DVI_0 = @echo "  TEXI2DVI" $@;
am__v_TEXI2DVI_1 = 
AM_V_TEXI2PDF = $(am__v_TEXI2PDF_$(V))
am__v_TEXI2PDF_ = $(am__v_TEXI2PDF_$(AM_DEFAULT_VERBOSITY))
am__v_TEXI2PDF_0 = @echo "  TEXI2PDF" $@;
am__v_TEXI2PDF_1 = 
AM_V_texinfo = $(am__v_texinfo_$(V))
am__v_texinfo_ = $(am__v_texinfo_$(AM_DEFAULT_VERBOSITY))
am__v_texinfo_0 = -q
am__v_texinfo_1 = 
AM_V_texidevnull = $(am__v_texidevnull_$(V))
am__v_texidevnull_ = $(am__v_texidevnull_$(AM_DEFAULT_VERBOSITY))
am__v_texidevnull_0 = > /dev/null
am__v_texidevnull_1 = 
INFO_DEPS = $(srcdir)/doc/libffi.info
am__TEXINFO_TEX_DIR = $(srcdir)
DVIS = doc/libffi.dvi
PDFS = doc/libffi.pdf
PSS = doc/libffi.ps
HTMLS = doc/libffi.html
TEXINFOS = doc/libffi.texi
TEXI2DVI = texi2dvi
TEXI2PDF = $(TEXI2DVI) --pdf --batch
MAKEINFOHTML = $(MAKEINFO) --html
AM_MAKEINFOHTMLFLAGS = $(AM_MAKEINFOFLAGS)
DVIPS = dvips
RECURSIVE_TARGETS = all-recursive check-recursive cscopelist-recursive \
 ctags-recursive dvi-recursive html-recursive info-recursive \
 install-data-recursive install-dvi-recursive \
 install-exec-recursive install-html-recursive \
 install-info-recursive install-pdf-recursive \
 install-ps-recursive install-recursive installcheck-recursive \
 installdirs-recursive pdf-recursive ps-recursive \
 tags-recursive uninstall-recursive
am__can_run_installinfo = \
  case $$AM_UPDATE_INFO_DIR in \
    n|no|NO) false;; \
    *) (install-info --version) >/dev/null 2>&1;; \
  esac
DATA = $(pkgconfig_DATA)
RECURSIVE_CLEAN_TARGETS = mostlyclean-recursive clean-recursive	\
  distclean-recursive maintainer-clean-recursive
am__recursive_targets = \
  $(RECURSIVE_TARGETS) \
  $(RECURSIVE_CLEAN_TARGETS) \
  $(am__extra_recursive_targets)
AM_RECURSIVE_TARGETS = $(am__recursive_targets:-recursive=) TAGS CTAGS \
 cscope distdir dist dist-all distcheck
am__tagged_files = $(HEADERS) $(SOURCES) $(TAGS_FILES) \
 $(LISP)fficonfig.h.in
am__uniquify_input = $(AWK) '\
  BEGIN { nonempty = 0; } \
  { items[$$0] = 1; nonempty = 1; } \
  END { if (nonempty) { for (i in items) print i; }; } \
'
am__define_uniq_tagged_files = \
  list='$(am__tagged_files)'; \
  unique=`for i in $$list; do \
    if test -f "$$i"; then echo $$i; else echo $(srcdir)/$$i; fi; \
  done | $(am__uniquify_input)`
ETAGS = etags
CTAGS = ctags
CSCOPE = cscope
DIST_SUBDIRS = $(SUBDIRS)
DISTFILES = $(DIST_COMMON) $(DIST_SOURCES) $(TEXINFOS) $(EXTRA_DIST)
distdir = $(PACKAGE)-$(VERSION)
top_distdir = $(distdir)
am__remove_distdir = \
  if test -d "$(distdir)"; then \
    find "$(distdir)" -type d ! -perm -200 -exec chmod u+w {} ';' \
      && rm -rf "$(distdir)" \
      || { sleep 5 && rm -rf "$(distdir)"; }; \
  else :; fi
am__post_remove_distdir = $(am__remove_distdir)
am__relativize = \
  dir0=`pwd`; \
  sed_first='s,^\([^/]*\)/.*$$,\1,'; \
  sed_rest='s,^[^/]*/*,,'; \
  sed_last='s,^.*/\([^/]*\)$$,\1,'; \
  sed_butlast='s,/*[^/]*$$,,'; \
  while test -n "$$dir1"; do \
    first=`echo "$$dir1" | sed -e "$$sed_first"`; \
    if test "$$first" != "."; then \
      if test "$$first" = ".."; then \
        dir2=`echo "$$dir0" | sed -e "$$sed_last"`/"$$dir2"; \
        dir0=`echo "$$dir0" | sed -e "$$sed_butlast"`; \
      else \
        first2=`echo "$$dir2" | sed -e "$$sed_first"`; \
        if test "$$first2" = "$$first"; then \
          dir2=`echo "$$dir2" | sed -e "$$sed_rest"`; \
        else \
          dir2="../$$dir2"; \
        fi; \
        dir0="$$dir0"/"$$first"; \
      fi; \
    fi; \
    dir1=`echo "$$dir1" | sed -e "$$sed_rest"`; \
  done; \
  reldir="$$dir2"
DIST_ARCHIVES = $(distdir).tar.gz
GZIP_ENV = --best
DIST_TARGETS = dist-gzip
distuninstallcheck_listfiles = find . -type f -print
am__distuninstallcheck_listfiles = $(distuninstallcheck_listfiles) \
  | sed 's|^\./|$(prefix)/|' | grep -v '$(infodir)/dir$$'
distcleancheck_listfiles = find . -type f -print
ACLOCAL = ${SHELL} /home/niikoo/Documents/Projects/node-ffi/deps/libffi/missing aclocal-1.13
ALLOCA = 
AMTAR = $${TAR-tar}
AM_DEFAULT_VERBOSITY = 1
AM_LTLDFLAGS = 
AM_RUNTESTFLAGS = 
AR = ar
AUTOCONF = ${SHELL} /home/niikoo/Documents/Projects/node-ffi/deps/libffi/missing autoconf
AUTOHEADER = ${SHELL} /home/niikoo/Documents/Projects/node-ffi/deps/libffi/missing autoheader
AUTOMAKE = ${SHELL} /home/niikoo/Documents/Projects/node-ffi/deps/libffi/missing automake-1.13
AWK = gawk
CC = gcc
CCAS = gcc
CCASDEPMODE = depmode=gcc3
CCASFLAGS = 
CCDEPMODE = depmode=gcc3
CFLAGS = -O3 -fomit-frame-pointer -fstrict-aliasing -ffast-math -march=core2  -Wall -fexceptions
CPP = gcc -E
CPPFLAGS = 
CXX = g++
CXXCPP = g++ -E
CXXDEPMODE = depmode=gcc3
CXXFLAGS = -g -O2
CYGPATH_W = echo
DEFS = -DHAVE_CONFIG_H
DEPDIR = .deps
DLLTOOL = false
DSYMUTIL = 
DUMPBIN = 
ECHO_C = 
ECHO_N = -n
ECHO_T = 
EGREP = /bin/grep -E
EXEEXT = 
FFI_EXEC_TRAMPOLINE_TABLE = 0
FGREP = /bin/grep -F
GREP = /bin/grep
HAVE_LONG_DOUBLE = 1
HAVE_LONG_DOUBLE_VARIANT = 0
INSTALL = /usr/bin/install -c
INSTALL_DATA = ${INSTALL} -m 644
INSTALL_PROGRAM = ${INSTALL}
INSTALL_SCRIPT = ${INSTALL}
INSTALL_STRIP_PROGRAM = $(install_sh) -c -s
LD = /usr/bin/ld -m elf_x86_64
LDFLAGS = 
LIBOBJS = 
LIBS = 
LIBTOOL = $(SHELL) $(top_builddir)/libtool
LIPO = 
LN_S = ln -s
LTLIBOBJS = 
MAINT = #
MAKEINFO = ${SHELL} /home/niikoo/Documents/Projects/node-ffi/deps/libffi/missing makeinfo
MANIFEST_TOOL = :
MKDIR_P = /bin/mkdir -p
NM = /usr/bin/nm -B
NMEDIT = 
OBJDUMP = objdump
OBJEXT = o
OTOOL = 
OTOOL64 = 
PACKAGE = libffi
PACKAGE_BUGREPORT = http://github.com/atgreen/libffi/issues
PACKAGE_NAME = libffi
PACKAGE_STRING = libffi 3.2.1
PACKAGE_TARNAME = libffi
PACKAGE_URL = 
PACKAGE_VERSION = 3.2.1
PATH_SEPARATOR = :
PRTDIAG = 
RANLIB = ranlib
SED = /bin/sed
SET_MAKE = 
SHELL = /bin/bash
STRIP = strip
TARGET = X86_64
TARGETDIR = x86
VERSION = 3.2.1
abs_builddir = /home/niikoo/Documents/Projects/node-ffi/deps/libffi/x86_64-unknown-linux-gnu
abs_srcdir = /home/niikoo/Documents/Projects/node-ffi/deps/libffi/x86_64-unknown-linux-gnu/..
abs_top_builddir = /home/niikoo/Documents/Projects/node-ffi/deps/libffi/x86_64-unknown-linux-gnu
abs_top_srcdir = /home/niikoo/Documents/Projects/node-ffi/deps/libffi/x86_64-unknown-linux-gnu/..
ac_ct_AR = ar
ac_ct_CC = gcc
ac_ct_CXX = g++
ac_ct_DUMPBIN = 
am__include = include
am__leading_dot = .
am__quote = 
am__tar = $${TAR-tar} chof - "$$tardir"
am__untar = $${TAR-tar} xf -
ax_enable_builddir_sed = sed
bindir = ${exec_prefix}/bin
build = x86_64-unknown-linux-gnu
build_alias = 
build_cpu = x86_64
build_os = linux-gnu
build_vendor = unknown
builddir = .
datadir = ${datarootdir}
datarootdir = ${prefix}/share
docdir = ${datarootdir}/doc/${PACKAGE_TARNAME}
dvidir = ${docdir}
exec_prefix = ${prefix}
host = x86_64-unknown-linux-gnu
host_alias = 
host_cpu = x86_64
host_os = linux-gnu
host_vendor = unknown
htmldir = ${docdir}
includedir = ${prefix}/include
infodir = ${datarootdir}/info
install_sh = ${SHELL} /home/niikoo/Documents/Projects/node-ffi/deps/libffi/install-sh
libdir = ${exec_prefix}/lib
libexecdir = ${exec_prefix}/libexec
localedir = ${datarootdir}/locale
localstatedir = ${prefix}/var
mandir = ${datarootdir}/man
mkdir_p = $(MKDIR_P)
oldincludedir = /usr/include
pdfdir = ${docdir}
prefix = /usr/local
program_transform_name = s,x,x,
psdir = ${docdir}
sbindir = ${exec_prefix}/sbin
sharedstatedir = ${prefix}/com
srcdir = .
sys_symbol_underscore = no
sysconfdir = ${prefix}/etc
target = x86_64-unknown-linux-gnu
target_alias = 
target_cpu = x86_64
target_os = linux-gnu
target_vendor = unknown
toolexecdir = ${exec_prefix}/lib/gcc-lib/$(target_alias)
toolexeclibdir = ${exec_prefix}/lib/../lib
top_build_prefix = 
top_builddir = .
top_srcdir = .
AUTOMAKE_OPTIONS = foreign subdir-objects
ACLOCAL_AMFLAGS = -I m4
SUBDIRS = include testsuite man
EXTRA_DIST = LICENSE ChangeLog.v1 ChangeLog.libgcj			\
  src/aarch64/ffi.c src/aarch64/ffitarget.h src/aarch64/sysv.S	\
  src/alpha/ffi.c src/alpha/osf.S			\
  src/alpha/ffitarget.h src/arc/ffi.c src/arc/arcompact.S	\
  src/arc/ffitarget.h src/arm/ffi.c src/arm/sysv.S		\
  src/arm/ffitarget.h src/avr32/ffi.c src/avr32/sysv.S		\
  src/avr32/ffitarget.h src/cris/ffi.c src/cris/sysv.S		\
  src/cris/ffitarget.h src/ia64/ffi.c src/ia64/ffitarget.h	\
  src/ia64/ia64_flags.h src/ia64/unix.S src/mips/ffi.c		\
  src/mips/n32.S src/mips/o32.S src/metag/ffi.c			\
  src/metag/ffitarget.h src/metag/sysv.S src/moxie/ffi.c		\
  src/moxie/ffitarget.h src/moxie/eabi.S src/mips/ffitarget.h	\
  src/m32r/ffi.c src/m32r/sysv.S src/m32r/ffitarget.h		\
  src/m68k/ffi.c src/m68k/sysv.S src/m68k/ffitarget.h		\
  src/m88k/ffi.c src/m88k/obsd.S src/m88k/ffitarget.h		\
  src/microblaze/ffi.c src/microblaze/sysv.S			\
  src/microblaze/ffitarget.h					\
  src/nios2/ffi.c src/nios2/ffitarget.h src/nios2/sysv.S		\
  src/or1k/ffi.c src/or1k/ffitarget.h src/or1k/sysv.S		\
  src/powerpc/ffi.c src/powerpc/ffi_powerpc.h			\
  src/powerpc/ffi_sysv.c src/powerpc/ffi_linux64.c		\
  src/powerpc/sysv.S src/powerpc/linux64.S			\
  src/powerpc/linux64_closure.S src/powerpc/ppc_closure.S	\
  src/powerpc/asm.h src/powerpc/aix.S src/powerpc/darwin.S	\
  src/powerpc/aix_closure.S src/powerpc/darwin_closure.S		\
  src/powerpc/ffi_darwin.c src/powerpc/ffitarget.h		\
  src/s390/ffi.c src/s390/sysv.S src/s390/ffitarget.h		\
  src/sh/ffi.c src/sh/sysv.S src/sh/ffitarget.h src/sh64/ffi.c	\
  src/sh64/sysv.S src/sh64/ffitarget.h src/sparc/v8.S		\
  src/sparc/v9.S src/sparc/ffitarget.h src/sparc/ffi.c		\
  src/x86/darwin64.S src/x86/ffi.c src/x86/sysv.S		\
  src/x86/win32.S src/x86/darwin.S src/x86/win64.S		\
  src/x86/freebsd.S src/x86/ffi64.c src/x86/unix64.S		\
  src/x86/ffitarget.h src/pa/ffitarget.h src/pa/ffi.c		\
  src/pa/linux.S src/pa/hpux32.S src/frv/ffi.c src/bfin/ffi.c	\
  src/bfin/ffitarget.h src/bfin/sysv.S src/frv/eabi.S		\
  src/frv/ffitarget.h src/dlmalloc.c src/tile/ffi.c		\
  src/tile/ffitarget.h src/tile/tile.S libtool-version		\
  src/vax/ffi.c src/vax/ffitarget.h src/vax/elfbsd.S		\
  src/xtensa/ffitarget.h src/xtensa/ffi.c src/xtensa/sysv.S	\
  ChangeLog.libffi m4/libtool.m4 m4/lt~obsolete.m4		\
  m4/ltoptions.m4 m4/ltsugar.m4 m4/ltversion.m4			\
  m4/ltversion.m4 src/arm/gentramp.sh src/debug.c msvcc.sh	\
  generate-darwin-source-and-headers.py				\
  libffi.xcodeproj/project.pbxproj src/arm/trampoline.S		\
  libtool-ldflags ChangeLog.libffi-3.1

info_TEXINFOS = doc/libffi.texi

AM_MAKEFLAGS = \
 'AR_FLAGS=$(AR_FLAGS)' \
 'CC_FOR_BUILD=$(CC_FOR_BUILD)' \
 'CFLAGS=$(CFLAGS)' \
 'CXXFLAGS=$(CXXFLAGS)' \
 'CFLAGS_FOR_BUILD=$(CFLAGS_FOR_BUILD)' \
 'CFLAGS_FOR_TARGET=$(CFLAGS_FOR_TARGET)' \
 'INSTALL=$(INSTALL)' \
 'INSTALL_DATA=$(INSTALL_DATA)' \
 'INSTALL_PROGRAM=$(INSTALL_PROGRAM)' \
 'INSTALL_SCRIPT=$(INSTALL_SCRIPT)' \
 'JC1FLAGS=$(JC1FLAGS)' \
 'LDFLAGS=$(LDFLAGS)' \
 'LIBCFLAGS=$(LIBCFLAGS)' \
 'LIBCFLAGS_FOR_TARGET=$(LIBCFLAGS_FOR_TARGET)' \
 'MAKE=$(MAKE)' \
 'MAKEINFO=$(MAKEINFO) $(MAKEINFOFLAGS)' \
 'PICFLAG=$(PICFLAG)' \
 'PICFLAG_FOR_TARGET=$(PICFLAG_FOR_TARGET)' \
 'RUNTESTFLAGS=$(RUNTESTFLAGS)' \
 'SHELL=$(SHELL)' \
 'exec_prefix=$(exec_prefix)' \
 'infodir=$(infodir)' \
 'libdir=$(libdir)' \
 'mandir=$(mandir)' \
 'prefix=$(prefix)' \
 'AR=$(AR)' \
 'AS=$(AS)' \
 'CC=$(CC)' \
 'CXX=$(CXX)' \
 'LD=$(LD)' \
 'NM=$(NM)' \
 'RANLIB=$(RANLIB)' \
 'DESTDIR=$(DESTDIR)'

FLAGS_TO_PASS = $(AM_MAKEFLAGS)
MAKEOVERRIDES = 
toolexeclib_LTLIBRARIES = libffi.la
noinst_LTLIBRARIES = libffi_convenience.la
libffi_la_SOURCES = src/prep_cif.c src/types.c \
 	src/raw_api.c src/java_raw_api.c src/closures.c

pkgconfigdir = $(libdir)/pkgconfig
pkgconfig_DATA = libffi.pc
nodist_libffi_la_SOURCES = $(am__append_1) $(am__append_2) \
 $(am__append_3) $(am__append_4) $(am__append_5) \
 $(am__append_6) $(am__append_7) $(am__append_8) \
 $(am__append_9) $(am__append_10) $(am__append_11) \
 $(am__append_12) $(am__append_13) $(am__append_14) \
 $(am__append_15) $(am__append_16) $(am__append_17) \
 $(am__append_18) $(am__append_19) $(am__append_20) \
 $(am__append_21) $(am__append_22) $(am__append_23) \
 $(am__append_24) $(am__append_25) $(am__append_26) \
 $(am__append_27) $(am__append_28) $(am__append_29) \
 $(am__append_30) $(am__append_31) $(am__append_32) \
 $(am__append_33) $(am__append_34) $(am__append_35) \
 $(am__append_36) $(am__append_37) $(am__append_38) \
 $(am__append_39) $(am__append_40)
libffi_convenience_la_SOURCES = $(libffi_la_SOURCES)
nodist_libffi_convenience_la_SOURCES = $(nodist_libffi_la_SOURCES)
LTLDFLAGS = $(shell $(SHELL) $(top_srcdir)/libtool-ldflags $(LDFLAGS))
AM_CFLAGS = $(am__append_41)
libffi_la_LDFLAGS = -no-undefined -version-info `grep -v '^\#' $(srcdir)/libtool-version` $(LTLDFLAGS) $(AM_LTLDFLAGS)
AM_CPPFLAGS = -I. -I$(top_srcdir)/include -Iinclude -I$(top_srcdir)/src
AM_CCASFLAGS = $(AM_CPPFLAGS)
all-configured : all-all
all all-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

am--refresh am--refresh-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
$(srcdir)/Makefile.in:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
Makefile:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

$(top_builddir)/config.status:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

$(top_srcdir)/configure:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
$(ACLOCAL_M4):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
$(am__aclocal_m4_deps):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

fficonfig.h:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

stamp-h1 stamp-h1-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
$(srcdir)/fficonfig.h.in:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

distclean-hdr distclean-hdr-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
libffi.pc:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

clean-noinstLTLIBRARIES:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-toolexeclibLTLIBRARIES:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

uninstall-toolexeclibLTLIBRARIES:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

clean-toolexeclibLTLIBRARIES:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/prep_cif.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/types.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/raw_api.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/java_raw_api.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/closures.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/debug.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/mips/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/mips/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/mips/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/mips/o32.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/mips/n32.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/bfin/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/bfin/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/bfin/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/bfin/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/win32.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/freebsd.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/win64.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/darwin.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/ffi64.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/darwin64.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sparc/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sparc/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sparc/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sparc/v8.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sparc/v9.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/alpha/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/alpha/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/alpha/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/alpha/osf.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/ia64/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/ia64/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/ia64/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/ia64/unix.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m32r/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m32r/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m32r/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m32r/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m68k/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m68k/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m68k/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m68k/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m88k/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m88k/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m88k/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/m88k/obsd.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/moxie/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/moxie/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/moxie/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/moxie/eabi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/microblaze/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/microblaze/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/microblaze/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/microblaze/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/nios2/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/nios2/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/nios2/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/nios2/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/or1k/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/or1k/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/or1k/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/or1k/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/ffi_sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/ffi_linux64.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/ppc_closure.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/linux64.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/linux64_closure.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/ffi_darwin.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/aix.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/aix_closure.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/darwin.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/powerpc/darwin_closure.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/aarch64/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/aarch64/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/aarch64/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/aarch64/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/arc/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/arc/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/arc/arcompact.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/arc/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/arm/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/arm/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/arm/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/arm/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/arm/trampoline.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/avr32/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/avr32/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/avr32/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/avr32/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/cris/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/cris/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/cris/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/cris/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/frv/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/frv/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/frv/eabi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/frv/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/s390/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/s390/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/s390/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/s390/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/x86/unix64.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sh/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sh/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sh/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sh/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sh64/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sh64/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sh64/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/sh64/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/pa/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/pa/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/pa/linux.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/pa/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/pa/hpux32.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/tile/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/tile/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/tile/tile.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/tile/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/xtensa/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/xtensa/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/xtensa/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/xtensa/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/metag/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/metag/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/metag/sysv.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/metag/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/vax/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/vax/$(DEPDIR)/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/vax/elfbsd.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
src/vax/ffi.lo:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

libffi.la:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

libffi_convenience.la:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

mostlyclean-compile mostlyclean-compile-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

distclean-compile distclean-compile-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done








mostlyclean-libtool mostlyclean-libtool-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

clean-libtool clean-libtool-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

distclean-libtool distclean-libtool-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
doc/$(am__dirstamp):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

$(srcdir)/doc/libffi.info:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

doc/libffi.dvi:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

doc/libffi.pdf:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

doc/libffi.html:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
$(srcdir)/doc/version.texi:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
$(srcdir)/doc/stamp-vti:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

mostlyclean-vti mostlyclean-vti-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

maintainer-clean-vti maintainer-clean-vti-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

uninstall-dvi-am uninstall-dvi-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

uninstall-html-am uninstall-html-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

uninstall-info-am uninstall-info-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

uninstall-pdf-am uninstall-pdf-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

uninstall-ps-am uninstall-ps-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

dist-info dist-info-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh ./config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; found=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$found $(PACKAGE)-$(VERSION).*" \
	; if test "$$found" -eq "0" ; then : \
	; BUILD=` grep "^#### .*|" Makefile |tail -1| sed -e 's/.*|//' ` \
	; fi ; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; for f in $$i/$(PACKAGE)-$(VERSION).* \
	; do test -f "$$f" && mv "$$f" $(PUB). ; done ; break ; done

mostlyclean-aminfo mostlyclean-aminfo-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

clean-aminfo clean-aminfo-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

maintainer-clean-aminfo maintainer-clean-aminfo-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
install-pkgconfigDATA:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

uninstall-pkgconfigDATA:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

$(am__recursive_targets):
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

ID:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
tags tags-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
TAGS:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

tags-am tags-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
ctags ctags-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

CTAGS:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
ctags-am ctags-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

GTAGS:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
cscope cscope-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
clean-cscope clean-cscope-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
cscope.files:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
cscopelist cscopelist-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

cscopelist-am cscopelist-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

distclean-tags distclean-tags-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

distdir distdir-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
dist-gzip dist-gzip-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh ./config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; found=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$found $(PACKAGE)-$(VERSION).*" \
	; if test "$$found" -eq "0" ; then : \
	; BUILD=` grep "^#### .*|" Makefile |tail -1| sed -e 's/.*|//' ` \
	; fi ; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; for f in $$i/$(PACKAGE)-$(VERSION).* \
	; do test -f "$$f" && mv "$$f" $(PUB). ; done ; break ; done

dist-bzip2 dist-bzip2-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh ./config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; found=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$found $(PACKAGE)-$(VERSION).*" \
	; if test "$$found" -eq "0" ; then : \
	; BUILD=` grep "^#### .*|" Makefile |tail -1| sed -e 's/.*|//' ` \
	; fi ; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; for f in $$i/$(PACKAGE)-$(VERSION).* \
	; do test -f "$$f" && mv "$$f" $(PUB). ; done ; break ; done

dist-lzip dist-lzip-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh ./config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; found=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$found $(PACKAGE)-$(VERSION).*" \
	; if test "$$found" -eq "0" ; then : \
	; BUILD=` grep "^#### .*|" Makefile |tail -1| sed -e 's/.*|//' ` \
	; fi ; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; for f in $$i/$(PACKAGE)-$(VERSION).* \
	; do test -f "$$f" && mv "$$f" $(PUB). ; done ; break ; done

dist-xz dist-xz-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh ./config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; found=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$found $(PACKAGE)-$(VERSION).*" \
	; if test "$$found" -eq "0" ; then : \
	; BUILD=` grep "^#### .*|" Makefile |tail -1| sed -e 's/.*|//' ` \
	; fi ; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; for f in $$i/$(PACKAGE)-$(VERSION).* \
	; do test -f "$$f" && mv "$$f" $(PUB). ; done ; break ; done

dist-tarZ dist-tarZ-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh ./config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; found=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$found $(PACKAGE)-$(VERSION).*" \
	; if test "$$found" -eq "0" ; then : \
	; BUILD=` grep "^#### .*|" Makefile |tail -1| sed -e 's/.*|//' ` \
	; fi ; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; for f in $$i/$(PACKAGE)-$(VERSION).* \
	; do test -f "$$f" && mv "$$f" $(PUB). ; done ; break ; done

dist-shar dist-shar-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh ./config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; found=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$found $(PACKAGE)-$(VERSION).*" \
	; if test "$$found" -eq "0" ; then : \
	; BUILD=` grep "^#### .*|" Makefile |tail -1| sed -e 's/.*|//' ` \
	; fi ; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; for f in $$i/$(PACKAGE)-$(VERSION).* \
	; do test -f "$$f" && mv "$$f" $(PUB). ; done ; break ; done

dist-zip dist-zip-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh ./config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; found=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$found $(PACKAGE)-$(VERSION).*" \
	; if test "$$found" -eq "0" ; then : \
	; BUILD=` grep "^#### .*|" Makefile |tail -1| sed -e 's/.*|//' ` \
	; fi ; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; for f in $$i/$(PACKAGE)-$(VERSION).* \
	; do test -f "$$f" && mv "$$f" $(PUB). ; done ; break ; done

dist dist-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; found=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$found $(PACKAGE)-$(VERSION).tar.*" \
	; if test "$$found" -eq "0" ; then : \
	; BUILD=` grep "^#### .*|" Makefile |tail -1| sed -e 's/.*|//' ` \
	; fi ; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; for f in $$i/$(PACKAGE)-$(VERSION).tar.* \
	; do test -f "$$f" && mv "$$f" $(PUB). ; done ; break ; done

distcheck distcheck-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
distuninstallcheck distuninstallcheck-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
distcleancheck distcleancheck-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
check-am check-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
check check-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
all-am all-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
installdirs installdirs-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
installdirs-am installdirs-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
install install-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
install-exec install-exec-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
install-data install-data-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
uninstall uninstall-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-am install-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

installcheck installcheck-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
install-strip install-strip-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
mostlyclean-generic mostlyclean-generic-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

clean-generic clean-generic-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

distclean-generic distclean-generic-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

maintainer-clean-generic maintainer-clean-generic-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
clean clean-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

clean-am clean-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

distclean distclean-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### .*|" Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@ (all local builds)" \
	; test ".$$BUILD" = "." && BUILD="." \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; echo "# rm -r $$i"; done ; echo "# (sleep 3)" ; sleep 3 \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; echo "$$i" | grep "^/" > /dev/null && continue \
	; echo "$$i" | grep "^../" > /dev/null && continue \
	; echo "rm -r $$i"; (rm -r "$$i") ; done ; rm Makefile
distclean-am distclean-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

dvi dvi-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

dvi-am dvi-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

html html-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

html-am html-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

info info-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

info-am info-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-data-am install-data-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-dvi install-dvi-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-dvi-am install-dvi-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
install-exec-am install-exec-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-html install-html-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-html-am install-html-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
install-info install-info-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-info-am install-info-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
install-man install-man-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-pdf install-pdf-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-pdf-am install-pdf-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
install-ps install-ps-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

install-ps-am install-ps-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
installcheck-am installcheck-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

maintainer-clean maintainer-clean-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
maintainer-clean-am maintainer-clean-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

mostlyclean mostlyclean-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

mostlyclean-am mostlyclean-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

pdf pdf-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

pdf-am pdf-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

ps ps-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

ps-am ps-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done

uninstall-am uninstall-am-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done



dist-hook dist-hook-all:
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh /home/niikoo/Documents/Projects/node-ffi/deps/libffi/config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; use=` basename "$@" -all `; n=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$n * $@"; if test "$$n" -eq "0" ; then : \
	; BUILD=` grep "^####.*|" Makefile |tail -1| sed -e 's/.*|//' ` ; fi \
	; test ".$$BUILD" = "." && BUILD="." \
	; test "$$use" = "$@" && BUILD=` echo "$$BUILD" | tail -1 ` \
	; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; (cd "$$i" && test ! -f configure && $(MAKE) $$use) || exit; done
	@ HOST="$(HOST)" \
	; test ".$$HOST" = "." && HOST=` sh ./config.guess ` \
	; BUILD=` grep "^#### $$HOST " Makefile | sed -e 's/.*|//' ` \
	; found=` echo $$BUILD | wc -w ` \
	; echo "MAKE $$HOST : $$found $(PACKAGE)-$(VERSION).*" \
	; if test "$$found" -eq "0" ; then : \
	; BUILD=` grep "^#### .*|" Makefile |tail -1| sed -e 's/.*|//' ` \
	; fi ; for i in $$BUILD ; do test ".$$i" = "." && continue \
	; for f in $$i/$(PACKAGE)-$(VERSION).* \
	; do test -f "$$f" && mv "$$f" $(PUB). ; done ; break ; done

#### CONFIGURATIONS FOR TOPLEVEL MAKEFILE: 
####  |x86_64-unknown-linux-gnu
