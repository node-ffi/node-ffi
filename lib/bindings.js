
var join = require('path').join
  , bindings = 'ffi_bindings.node'

function requireTry () {

  var i = 0
    , l = arguments.length
    , n

  for (; i<l; i++) {
    n = arguments[i]
    try {
      return require(n)
    } catch (e) {
      if (!/not find/i.test(e.message)) {
        throw e
      }
    }
  }

  throw new Error('Could not load the bindings file. Tried:\n' +
      [].slice.call(arguments).map(function (a) { return '  - ' + a }).join('\n'))
}

module.exports = requireTry(
    // Production "Release" buildtype binary
    join(__dirname, '..', 'compiled', process.platform, process.arch, bindings)
    // Development files
    // Unix
  , join(__dirname, '..', 'out', 'Debug', bindings)
    // Windows
  , join(__dirname, '..', 'Debug', bindings)
)
