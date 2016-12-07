Meteor.methods({
  'addUser': function(userInfo) {
    check(userInfo, Object);
    return Accounts.createUser(userInfo);
  }
});
