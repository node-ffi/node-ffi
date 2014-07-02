{
  'targets': [
    {
      'target_name': 'ffi_tests',
      'sources': [ 'ffi_tests.cc' ],
      'include_dirs': [
        '<!(node -e "require(\'nan\')")'
      ]
    }
  ]
}
