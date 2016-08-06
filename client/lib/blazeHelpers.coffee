UI.registerHelper 'ifThen', (condition, returnValue) ->
  if condition then returnValue

UI.registerHelper 'ifElse', (condition, returnValue, elseValue) ->
  if condition then returnValue else elseValue

UI.registerHelper 'toCaps', (string) ->
  _.toUpper _.startCase string

UI.registerHelper 'lowerCase', (string) ->
  _.lowerCase string
