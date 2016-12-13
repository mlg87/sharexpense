// reactiveVars
Template.login.reactiveVars({
  withTemplateHelper: {
    isNewAccount: false,
    isSettingPassword: false,
    message: false
  }
})

// onCreated nonsense
Template.login.onCreated(function() {
  return this.autorun((function(_this) {
    return function() {
      return Session.get('enrollmentToken') ? _this.isSettingPassword.set(true) : _this.isSettingPassword.set(false)
    }
  })(this))
})

// template helpers
Template.login.helpers({
  // inputs for the form
  inputs: function() {
    let inputs, newAccountInputs
    const inst = Template.instance()
    // user is creating new account
    if (inst.isNewAccount.get()) {
      newAccountInputs = [
        {
          value: 'firstName',
          type: 'text',
          // s and m here are for display sizes | values are cols
          s: 12,
          m: 6
        },
        {
          value: 'lastName',
          type: 'text',
          s: 12,
          m: 6
        },
        {
          value: 'username',
          type: 'text',
          s: 12,
          m: 6
        },
        {
          value: 'email',
          type: 'email',
          s: 12,
          m: 6
        }
      ]
      inputs = newAccountInputs
    }
    // if user is setting up pw for first time
    else if (inst.isSettingPassword.get()) {
      passwordInputs = [
        {
          value: 'password',
          type: 'password',
          s: 12,
          m: 6
        },
        {
          value: 'confirmPassword',
          type: 'password',
          s: 12,
          m: 6
        }
      ]
      inputs = passwordInputs
    }
    // user is signing in with existing account
    else {
      inputs = [
        {
          value: 'username',
          type: 'text',
          s: 12,
          m: 6
        },
        {
          value: 'password',
          type: 'password',
          s: 12,
          m: 6
        }
      ]
    }
    _.each(inputs, (input) => input.placeholder = this.value)
    return inputs
  }
})

// dom events
Template.login.events({
  // toggles the form for existing users or account creation
  'click #signin-status': function(e, inst) {
    return inst.isNewAccount.set(!inst.isNewAccount.get())
  },

  'submit #login-credentials': function(e, inst) {
    let form
    e.preventDefault()
    form = $(e.target).serializeJSON()
    // new account creation
    if (inst.isNewAccount.get()) {
      return Meteor.call('addUser', form, function(err, res) {
        // notify user of err so they can correct form
        if (err) {
          sAlert.error(err)
          return
        }
        // if success, tell user to check email and set pw
        sAlert.success('Success! We\'ve sent you an email to finish setting up your account.')
        inst.message.set(true)
        return
      })
    }
    // user setting their pw for the first time
    else if (inst.isSettingPassword.get()) {
      // make sure the pws user entered are the same
      if (form.password !== form.confirmPassword) {
        sAlert.error('Your passwords don\'t match')
        return
      }
      // using the enrollmentToken and the resetPassword method allows us to
      // avoid sending the pw the user wants unencrypted over the wire
      Accounts.resetPassword(Session.get('enrollmentToken'), form.password, () => {
        sAlert.success('Success! Your password has been set. Don\'t forget it or you\'ll never be able to log into your account. JK. You can reset it.')
        // reset enrollmentToken var
        return Session.set('enrollmentToken', null)
      })
    }
    // existing user signing in
    else {
      return Meteor.loginWithPassword(form.username, form.password, function() {
        return Router.go('/home')
      })
    }
  }
})
