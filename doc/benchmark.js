var ffi = require('../')
var ref = require('ref')
var util = require('util')

function measureIterationsOverTime(what, duration, f, granularity) {
  granularity = granularity || 1000

  var iterations  = 0,
      start       = Date.now()

  while (Date.now() < (start + duration)) {
    for (var i = 0; i < granularity; i++) {
      f()
    }
    iterations += granularity
  }

  var duration = Date.now() - start
  var persec   = (iterations / (Date.now() - start)) * 1000

  util.log("Executed " + what + " " + iterations + " times in " + duration + "ms " + "(" + persec + "/sec)")
}


var benchLibrary = new ffi.Library(null, {
  "abs":        [ "int",    [ "int" ] ],
  "strtoul":    [ "ulong",  [ "string", "pointer", "int" ] ]
})

var blabs = benchLibrary.abs
var blstrtoul = benchLibrary.strtoul

/*measureIterationsOverTime("ffi abs", 5000, function() {
  blabs(1234)
})*/

measureIterationsOverTime("ffi strtoul", 5000, function() {
  blstrtoul("1234567890", null, 0)
})

strtoulFunc = ffi.Bindings.strtoul
strtoulPtr  = ref.NULL

measureIterationsOverTime("Binding strtoul", 5000, function() {
  strtoulFunc("1234567890", strtoulPtr, 0)
})
