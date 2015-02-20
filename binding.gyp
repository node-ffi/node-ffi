{
  'targets': [
    {
      'target_name': 'ffi_bindings',
      'include_dirs': [
        '<!(node -e "require(\'nan\')")'
      ],
      'sources': [
          'src/ffi.cc'
        , 'src/callback_info.cc'
        , 'src/threaded_callback_invokation.cc'
      ],
      'dependencies': [
        'deps/libffi/libffi.gyp:ffi'
      ],
      'conditions': [
        ['OS=="win"', {
          'dependencies': [
              'deps/dlfcn-win32/dlfcn.gyp:dlfcn'
            , 'deps/pthreads-win32/pthread.gyp:pthread'
          ],
          'msvs_settings': {
            'VCLinkerTool': {
              'AdditionalOptions': [
                '/FORCE:MULTIPLE'
              ]
            },
            'VCCLCompilerTool': {
              'AdditionalOptions': [
                '/EHsc'
              ]
            }
          }
        }],
        ['OS=="mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'MACOSX_DEPLOYMENT_TARGET': '10.5',
            'OTHER_CFLAGS': [
                '-ObjC++'
            ]
          },
          'libraries': [
              '-lobjc'
          ],
        }]
      ]
    }
  ]
}
