import Options
from os import unlink, symlink, popen
from os.path import exists 

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

  conf.env.append_value("LIB_FFI", "ffi")
  conf.env.append_value("LIB_DL", "dl")
  
  if conf.env['USE_DEBUG']:
    conf.env.append_value('CCFLAGS', ['-DDEBUG', '-g', '-ggdb', '-O0', '-Wall'])
    conf.env.append_value('CXXFLAGS', ['-DDEBUG', '-g', '-ggdb', '-O0', '-Wall'])

def build(bld):
  obj = bld.new_task_gen('cxx', 'shlib', 'node_addon')
  obj.target = 'node-ffi'
  obj.source = "node-ffi.cc"
  obj.uselib = "FFI DL"
    
def shutdown():
  if Options.commands['clean']:
    if exists('node-ffi.node'): unlink('node-ffi.node')
  elif Options.commands['build']:
    if exists('build/default/node-ffi.node') and not exists('node-ffi.node'):
      symlink('build/default/node-ffi.node', 'node-ffi.node')
