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
      'target_name': 'dlfcn',
      'type': 'static_library',
      'include_dirs': [ '.' ],
      'direct_dependent_settings': {
        'include_dirs': [ '.' ],
      },
      'defines': [ ],
      'sources': [ './dlfcn.c', ],
      #'conditions': [
      #  ['OS=="win"', {
      #    'msvs_settings': {
      #      'VCCLCompilerTool': {
      #        # Compile as C++. http_parser.c is actually C99, but C++ is
      #        # close enough in this case.
      #        'CompileAs': 2,
      #      },
      #    },
      #  }]
      #],
    },

    {
      'target_name': testdll',
      'type': 'shared_library',
      'defines': [ ],
      'sources': [ './testdll.c', ],
      'dependencies': [ 'dlfcn' ],
    },

    {
      'target_name': 'test',
      'type': 'executable',
      'dependencies': [ 'testdll' ],
      'sources': [ 'test.c' ]
    }
  ]
}
