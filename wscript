import sys
import Options
from os import unlink, symlink, popen
from os.path import exists
from logging import fatal

srcdir = '.'
blddir = 'build'
VERSION = '0.4.2'

def set_options(opt):
  opt.tool_options('compiler_cxx')
  opt.add_option('-D', '--debug', action='store_true', default=False, dest='debug')

def configure(conf):
  conf.check_tool('compiler_cxx')
  conf.check_tool('node_addon')

  conf.env['USE_DEBUG'] = Options.options.debug

  if not conf.check(lib='ffi'):
    if not conf.check(lib="ffi", libpath=['/usr/local/lib', '/opt/local/lib'], uselib_store="FFI"):
      fatal("libffi not found.")

  conf.env.append_value("CPPPATH_FFI", "/opt/local/include")
  conf.env.append_value("LIB_FFI", "ffi")
  conf.env.append_value("LIB_DL", "dl")

  conf.check_cfg(package='libffi', args='--cflags', uselib_store="FFI", mandatory=False)

  # the off_t size difference between the way node is compiled
  # and this will cause the eio_req to be different and crash
  # the node-ffi stuff
  conf.env.append_value('CCFLAGS',  '-D_LARGEFILE_SOURCE')
  conf.env.append_value('CXXFLAGS', '-D_LARGEFILE_SOURCE')
  conf.env.append_value('CCFLAGS',  '-D_FILE_OFFSET_BITS=64')
  conf.env.append_value('CXXFLAGS', '-D_FILE_OFFSET_BITS=64')

  # test for darwin, for ObjC @try/@catch support
  # there are ports of ObjC for linux, etc. but I'm not sure
  # the best way to detect for that
  if sys.platform.startswith("darwin"):
    if not conf.check(lib='objc'):
      if not conf.check(lib="objc", libpath=['/usr/lib'], uselib_store="OBJC"):
        fatal("libobjc not found.")
    conf.env.append_value('CCFLAGS',  '-ObjC++')
    conf.env.append_value('CXXFLAGS', '-ObjC++')

  if conf.env['USE_DEBUG']:
    conf.env.append_value('CCFLAGS', ['-DDEBUG', '-g', '-ggdb', '-O0', '-Wall'])
    conf.env.append_value('CXXFLAGS', ['-DDEBUG', '-g', '-ggdb', '-O0', '-Wall'])

def build(bld):
  obj = bld.new_task_gen('cxx', 'shlib', 'node_addon')
  obj.target = 'ffi_bindings'
  obj.source = './src/ffi.cc ./src/callback_info.cc ./src/pointer.cc ./src/threaded_callback_invokation.cc ./src/foreign_caller.cc'
  obj.uselib = 'FFI DL OBJC'
