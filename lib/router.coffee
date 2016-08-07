Router.configure
  layoutTemplate: 'layout'
  # go to login if user is not logged in
  onRun: ->
    # Session.set 'subsReady', false
    unless Meteor.userId()
      Router.go 'login'
    @next()
  waitOn: ->
    if Meteor.user()
      Meteor.subscribe 'users'

Router.route '/login',
  name: 'login'

Router.route '/home',
  name: 'home'
  # subscriptions:
  #   @subscribe 'users'
  #   @subscribe('users').wait()
