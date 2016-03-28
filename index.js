module.exports = function(firstArg) {
  "use strict";
  var key;
  var localArgs;
  var i;

  if (arguments.length === 1 || arguments.length === 0) {
    key = String(firstArg);
  } else {
    localArgs = [];
    for (i = 0; i < arguments.length; i++) {
      localArgs.push(arguments[i]);
    }
    key = localArgs.map(String).join(', ');
  }
  return function(spec) {
    var callable = typeof spec[key] === 'function' ? spec[key] : spec.default;
    return callable ? callable() : undefined;
  };
};
