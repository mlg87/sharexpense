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
        {value: 'email', placeholder: @value, type: 'email'}
      ]
      inputs = newAccountInputs.concat inputs
    inputs

Template.login.events
  'click #signin-status': (e, inst) ->
    inst.isNewAccount.set !inst.isNewAccount.get()

  'submit #login-credentials': (e, inst) ->
    e.preventDefault()
    form = $(e.target).serializeJSON()

    if inst.isNewAccount.get()
      Meteor.call 'addUser', form, (err, res) ->
        if err
          sAlert.error err
          return
        Router.go '/home'
    else
      Meteor.loginWithPassword form.username, form.password, ->
        Router.go '/home'
