Template.login.reactiveVars
  withTemplateHelper:
    isNewAccount: false

Template.login.helpers
  inputs: ->
    inst = Template.instance()
    inputs = [
      {value: 'username', placeholder: @value, type: 'text'}
      {value: 'password', placeholder: @value, type: 'password'}
    ]
    if inst.isNewAccount.get()
      newAccountInputs = [
        {value: 'firstName', placeholder: @value, type: 'text'}
        {value: 'lastName', placeholder: @value, type: 'text'}
      ]
      inputs = newAccountInputs.concat inputs
    inputs

Template.login.events
  'click #signin-status': (e, inst) ->
    inst.isNewAccount.set !inst.isNewAccount.get()

  'submit #login-credentials': (e, inst) ->
    e.preventDefault()
    form = $(e.target).serializeJSON()

    
