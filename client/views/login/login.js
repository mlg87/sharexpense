// reactiveVars
Template.login.reactiveVars({
  withTemplateHelper: {
    isNewAccount: false
  }
});

// template helpers
Template.login.helpers({
  // inputs for the form
  inputs: function() {
    let inputs, newAccountInputs;
    const inst = Template.instance();
    // login/sign up form will always have username and pw inputs
    inputs = [
      {
        value: 'username',
        placeholder: this.value,
        type: 'text'
      }, {
        value: 'password',
        placeholder: this.value,
        type: 'password'
      }
    ];
    // if user is creating new account, include other required fields
    if (inst.isNewAccount.get()) {
      newAccountInputs = [
        {
          value: 'firstName',
          placeholder: this.value,
          type: 'text'
        }, {
          value: 'lastName',
          placeholder: this.value,
          type: 'text'
        }, {
          value: 'email',
          placeholder: this.value,
          type: 'email'
        }
      ];
      inputs = newAccountInputs.concat(inputs);
    }
    return inputs;
  }
});

// dom events
Template.login.events({
  // toggles the form for existing users or account creation
  'click #signin-status': function(e, inst) {
    return inst.isNewAccount.set(!inst.isNewAccount.get());
  },

  'submit #login-credentials': function(e, inst) {
    let form;
    e.preventDefault();
    form = $(e.target).serializeJSON();
    // new account creation
    if (inst.isNewAccount.get()) {
      return Meteor.call('addUser', form, function(err, res) {
        // notify user of err so they can correct form
        if (err) {
          sAlert.error(err);
          return;
        }
        // if success, tell user to check email and set pw
        sAlert.success('Success! We\'ve sent you an email to finish setting up your account.');
        return;
      });
    }
    // existing user signing in
    else {
      return Meteor.loginWithPassword(form.username, form.password, function() {
        return Router.go('/home');
      });
    }
  }
});
