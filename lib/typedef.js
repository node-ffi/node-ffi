var ref = require('ref')

var voidPtr = ref.refType(ref.types.void);

var TypeDef = function (_type, _name) {
  var type, rtn;

  if (_type.indirection === 1)
    type = _type
  else
    type = voidPtr

  rtn = {
    indirection: type.indirection,
    size: type.size,
    get: type.get,
    set: type.set,
    alignment: type.alignment,
    name: _name || type.name,
    typedef: true,
  }

  rtn.cast = function (val) {
    val.type = rtn
    return val
  }

  return rtn;
};

module.exports = TypeDef
