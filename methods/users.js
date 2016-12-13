import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
  'addUser': function(userInfo) {
    check(userInfo, Object);
    console.log('userInfo', userInfo);
    let userId = Accounts.createUser(userInfo);
    if (Meteor.isServer) {
      Accounts.sendEnrollmentEmail(userId);
    }
    return
  }
});
