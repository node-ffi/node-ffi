import Options
from os import unlink, symlink, popen
from os.path import exists 
from logging import fatal

srcdir = '.'
blddir = 'build'
VERSION = '0.0.1'

def set_options(opt):
  opt.tool_options('compiler_cxx')
  opt.add_option('-D', '--debug', action='store_true', default=False, dest='debug')

def configure(conf):
  conf.check_tool('compiler_cxx')
  conf.check_tool('node_addon')

  conf.env['USE_DEBUG'] = Options.options.debug

  if not conf.check(lib='ffi'):
    fatal("libffi not found.")

  conf.env.append_value("LIB_FFI", "ffi")
  conf.env.append_value("LIB_DL", "dl")
  
  # the off_t size difference between the way node is compiled
  # and this will cause the eio_req to be different and crash
  # the node-ffi stuff
  conf.env.append_value('CCFLAGS',  '-D_LARGEFILE_SOURCE')
  conf.env.append_value('CXXFLAGS', '-D_LARGEFILE_SOURCE')
  conf.env.append_value('CCFLAGS',  '-D_FILE_OFFSET_BITS=64')
  conf.env.append_value('CXXFLAGS', '-D_FILE_OFFSET_BITS=64')
  
  if conf.env['USE_DEBUG']:
    conf.env.append_value('CCFLAGS', ['-DDEBUG', '-g', '-ggdb', '-O0', '-Wall'])
    conf.env.append_value('CXXFLAGS', ['-DDEBUG', '-g', '-ggdb', '-O0', '-Wall'])

def build(bld):
  obj = bld.new_task_gen('cxx', 'shlib', 'node_addon')
  obj.target = '_ffi'
  obj.source = '_ffi.cc'
  obj.uselib = 'FFI DL'

def shutdown():
  if Options.commands['clean']:
    if exists('_ffi.node'): unlink('_ffi.node')
  elif Options.commands['build']:
    if exists('build/default/_ffi.node') and not exists('_ffi.node'):
      symlink('build/default/_ffi.node', '_ffi.node')
