Template.home.reactiveVars({
  withTemplateHelper: {
    signedInUser: null
  }
});

Template.home.onCreated(function() {
  return this.signedInUser.set(Meteor.user());
});
