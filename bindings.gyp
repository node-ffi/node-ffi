{
  'targets': [
    {
      'target_name': 'ffi_bindings',
      'sources': [
          'src/ffi.cc'
        , 'src/callback_info.cc'
        , 'src/pointer.cc'
        , 'src/threaded_callback_invokation.cc'
        , 'src/foreign_caller.cc'
      ],
      'libraries': [ 'deps/libffi/.libs/libffi.a' ],
      'include_dirs': [ 'deps/libffi', 'deps/libffi/include' ],
    }
  ]
}
