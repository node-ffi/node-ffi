# This file is used with the GYP meta build system.
# http://code.google.com/p/gyp
# To build try this:
#   svn co http://gyp.googlecode.com/svn/trunk gyp
#   ./gyp/gyp -f make --depth=`pwd` libffi.gyp
#   make
#   ./out/Debug/test

{
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



  'targets': [
    {
      'variables': {
        'target_arch%': 'ia32'
      },
      'target_name': 'ffi',
      'product_prefix': 'lib',
      'type': 'static_library',
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
        # platform and arch-specific headers
        'config/<(OS)/<(target_arch)'
      ],
      'direct_dependent_settings': {
        'include_dirs': [
          'include',
          # platform and arch-specific headers
          'config/<(OS)/<(target_arch)'
        ],
      },
      'conditions': [
        ['target_arch=="arm"', {
          'sources': [ 'src/arm/ffi.c' ],
          'conditions': [
            ['OS=="linux"', {
              'sources': [ 'src/arm/sysv.S' ]
            }]
          ]
        }, { # ia32 or x64
          'sources': [
            'src/x86/ffi.c',
            'src/x86/ffi64.c'
          ],
          'conditions': [
            ['OS=="mac"', {
              'sources': [
                'src/x86/darwin.S',
                'src/x86/darwin64.S'
              ]
            }],
            ['OS=="win"', {
              'conditions': [
                ['target_arch=="ia32"', {
                  'sources': [ 'src/x86/win32.S' ]
                  'sources!': [ 'src/x86/ffi64.c' ]
                }, { # target_arch=="x64"
                  'sources': [ 'src/x86/win64.S' ]
                }]
              ]
            }],
            ['OS=="linux" or OS=="solaris"', {
              'sources': [
                'src/x86/unix64.S',
                'src/x86/sysv.S'
              ]
            }]
          ]
        }],
      ]
    },

    {
      'target_name': 'test',
      'type': 'executable',
      'dependencies': [ 'ffi' ],
      'sources': [ 'test.c' ]
    }
  ]
}
