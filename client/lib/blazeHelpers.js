UI.registerHelper('log', function(toLog, msg) {
  if (msg == null) {
    msg = 'LOG FROM UI';
  }
  return console.log(msg, toLog);
});

UI.registerHelper('ifThen', function(condition, returnValue) {
  if (condition) {
    return returnValue;
  }
});

UI.registerHelper('ifElse', function(condition, returnValue, elseValue) {
  if (condition) {
    return returnValue;
  } else {
    return elseValue;
  }
});

UI.registerHelper('toCaps', function(string) {
  return _.toUpper(_.startCase(string));
});

UI.registerHelper('lowerCase', function(string) {
  return _.lowerCase(string);
});
