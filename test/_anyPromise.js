// Node 0.10 doesn't have a builtin Promise implementation
// Because of that, we use Bluebird for tests
// We need to run this before requiring the project

if (!require('any-promise/implementation')) {
  require('any-promise/register')('bluebird')
}
