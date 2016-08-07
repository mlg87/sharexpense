Template.home.reactiveVars
  withTemplateHelper:
    signedInUser: null

Template.home.onCreated ->
  @signedInUser.set Meteor.user()
