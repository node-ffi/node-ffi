
var join = require('path').join
  , bindings = 'ffi_bindings.node'

function requireTry () {

  var i = 0
    , l = arguments.length
    , n

  for (; i<l; i++) {
    n = arguments[i]
    try {
      var b = require(n)
      b.path = n
      return b
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
    // Release files, but manually compiled
  , join(__dirname, '..', 'out', 'Release', bindings) // Unix
  , join(__dirname, '..', 'Release', bindings)        // Windows
    // Debug files, for development
  , join(__dirname, '..', 'out', 'Debug', bindings)   // Unix
  , join(__dirname, '..', 'Debug', bindings)          // Windows
)
