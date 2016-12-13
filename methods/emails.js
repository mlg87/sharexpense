Meteor.methods({
  'sendEmail': function(recipient, subject, body) {
    check(subject, String)
    check(body, String)
    // check does not have a type 'Email'
    SE.utils.isValidEmail(recipient)

    console.log('arguments for our shit', arguments);
  }
});
