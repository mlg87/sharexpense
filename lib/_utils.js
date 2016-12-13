SE.utils = {
  isValidEmail: function(email) {
    // only check email if it is a string
    if (_.isString(email)) {
      emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      return emailRegex.test(email)
    }
    else {
      return false
    }
  }
};
