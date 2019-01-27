# This file is used with the GYP meta build system.
# http://code.google.com/p/gyp
# To build try this:
#   svn co http://gyp.googlecode.com/svn/trunk gyp
#   ./gyp/gyp -f make --depth=`pwd` libffi.gyp
#   make
#   ./out/Debug/test

{
  'variables': {
    'target_arch%': 'ia32', # built for a 32-bit CPU by default
  },
  'target_defaults': {
    'default_configuration': 'Debug',
    'configurations': {
      # TODO: hoist these out and put them somewhere common, because
      #       RuntimeLibrary MUST MATCH across the entire project
      'Debug': {
        'defines': [ 'DEBUG', '_DEBUG' ],
        'msvs_settings': {
          'VCCLCompilerTool': {
            'RuntimeLibrary': 1, # static debug
          },
        },
      },
      'Release': {
        'defines': [ 'NDEBUG' ],
        'msvs_settings': {
          'VCCLCompilerTool': {
            'RuntimeLibrary': 0, # static release
          },
        },
      }
    },
    'msvs_settings': {
      'VCCLCompilerTool': {
      },
      'VCLibrarianTool': {
      },
      'VCLinkerTool': {
        'GenerateDebugInformation': 'true',
      },
    },
    'conditions': [
      ['OS == "win"', {
        'defines': [
          'WIN32'
        ],
      }]
    ],
  },

  # Compile .asm files on Windows
  'conditions': [
    ['OS=="win"', {
      'target_defaults': {
        'conditions': [
          ['target_arch=="ia32"', {
            'variables': { 'ml': ['ml', '/nologo', '/safeseh' ] }
          }, {
            'variables': { 'ml': ['ml64', '/nologo' ] }
          }]
        ],
        'rules': [
          {
            'rule_name': 'assembler',
            'msvs_cygwin_shell': 0,
            'extension': 'asm',
            'inputs': [
            ],
            'outputs': [
              '<(INTERMEDIATE_DIR)/<(RULE_INPUT_ROOT).obj',
            ],
            'action': [
              '<@(ml)', '/c', '/Fo<(INTERMEDIATE_DIR)/<(RULE_INPUT_ROOT).obj', '<(RULE_INPUT_PATH)'
            ],
            'message': 'Building assembly file <(RULE_INPUT_PATH)',
            'process_outputs_as_sources': 1,
          },
        ],
      },
    },
    # else
    {
      'variables': {
        'prebuilt_headers': '<!(./configure --enable-static --disable-shared --disable-builddir --with-pic)',
      }
    }],
  ],

  'targets': [
    {
      'target_name': 'ffi',
      'product_prefix': 'lib',
      'type': 'static_library',

      # for CentOS 5 support: https://github.com/rbranson/node-ffi/issues/110
      'standalone_static_library': 1,

      'sources': [
        'src/prep_cif.c',
        'src/types.c',
        'src/raw_api.c',
        'src/java_raw_api.c',
        'src/closures.c',
      ],
      'defines': [
        'PIC',
        'FFI_BUILDING',
        'HAVE_CONFIG_H'
      ],
      'include_dirs': [
        'include',
        '.'
      ],
      'direct_dependent_settings': {
        'include_dirs': [
          'include',
          '.'
        ],
      },
      # reference: Makefile.in#L83-L122
      'conditions': [
        ['target_arch=="arm"', {
          'sources': [ 'src/arm/ffi.c' ],
          'conditions': [
            ['OS=="linux"', {
              'sources': [ 'src/arm/sysv.S' ]
            }]
          ]
        }, {
          'conditions': [
            ['OS=="win"', {
              # the libffi dlmalloc.c file has a bunch of implicit conversion
              # warnings, and the main ffi.c file contains one, so silence them
              'msvs_disabled_warnings': [ 4267 ],
              'include_dirs': [ 'windows/<(target_arch)' ],
              # all windows system not use sysv.S
              # all windows system need to prebuilt S file to asm file
              'sources': [
                'src/x86/ffi.c',
              ],
              'conditions': [
                ['target_arch=="ia32"', {
                  'sources': [
                    'src/x86/win32.asm',
                  ]
                }, { # target_arch=="x64"
                  'sources': [
                    'src/x86/win64.asm',
                  ]
                }]
              ],
            }, {
              # all x86 system reuse makefile configure result
              'sources': ['<!@(grep "^am__append" Makefile | sed -e "s/.* = //")'],
            }],
          ]
        }],
      ]
    },

    {
      'target_name': 'test',
      'type': 'executable',
      'dependencies': [ 'ffi' ],
      'sources': [ 'test.c' ]
    },

    {
      'target_name': 'closure-test',
      'type': 'executable',
      'dependencies': [ 'ffi' ],
      'sources': [ 'closure.c' ]
    }
  ]
}
