var Validator;

Validator = require('meteor/jagi:astronomy').Validator;

Validator.create({
  name: 'unique',
  parseParam: function(param) {
    if (!param) {
      throw new TypeError('shit wont work');
    }
  },
  isValid: function(val, key) {
    console.log('running in astro');
    return true;
  },
  resolveError: function(name, param) {
    return name + " needs to be unique, and " + param + " is taken";
  }
});
