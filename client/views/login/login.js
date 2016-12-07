Template.login.reactiveVars({
  withTemplateHelper: {
    isNewAccount: false
  }
});

Template.login.helpers({
  inputs: function() {
    var inputs, inst, newAccountInputs;
    inst = Template.instance();
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

Template.login.events({
  'click #signin-status': function(e, inst) {
    return inst.isNewAccount.set(!inst.isNewAccount.get());
  },
  'submit #login-credentials': function(e, inst) {
    var form;
    e.preventDefault();
    form = $(e.target).serializeJSON();
    if (inst.isNewAccount.get()) {
      return Meteor.call('addUser', form, function(err, res) {
        if (err) {
          sAlert.error(err);
          return;
        }
        return Router.go('/home');
      });
    } else {
      return Meteor.loginWithPassword(form.username, form.password, function() {
        return Router.go('/home');
      });
    }
  }
});
