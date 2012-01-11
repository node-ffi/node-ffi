
var join = require('path').join

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
      [].slice.call(arguments).map(function (a) { return '  - ' + a }))
}

module.exports = requireTry(
    // Production "Release" buildtype binary
    join(__dirname, '..', 'compiled', process.platform, process.arch, 'ffi_bindings.node')
    // Development files
    // Unix
  , join(__dirname, '..', 'out', 'Debug', 'ffi_bindings.node')
    // Windows
  , join(__dirname, '..', 'Debug', 'ffi_bindings.node')
)
