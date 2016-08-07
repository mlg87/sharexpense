Meteor.methods
  'addUser': (userInfo) ->
    check userInfo, Object

    Accounts.createUser userInfo
