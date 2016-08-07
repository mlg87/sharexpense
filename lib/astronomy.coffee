Validator = require('meteor/jagi:astronomy').Validator

Validator.create
  name: 'unique'
  parseParam: (param) ->
    unless param
      throw new TypeError 'shit wont work'
  isValid: (val, key) ->
    console.log 'running in astro'
    return true
  resolveError: (name, param) ->
    "#{name} needs to be unique, and #{param} is taken"
