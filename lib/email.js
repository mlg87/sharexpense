var formatUrl;

Meteor.autorun(function(c) {
  var ref, ref1, ref2, ref3, ref4, ref5;
  if ((ref = Accounts.emailTemplates) != null) {
    ref.siteName = "sharExpense";
  }
  if ((ref1 = Accounts.emailTemplates) != null) {
    ref1.from = "sharExpense Support <masonlgoetz@gmail.com>";
  }
  if ((ref2 = Accounts.emailTemplates) != null) {
    ref2.enrollAccount.subject = function(user) {
      return "Verify Your sharExpense Account, " + user.username;
    };
  }
  // if ((ref3 = Accounts.emailTemplates) != null) {
  //   ref3.enrollAccount.html = function(user, url) {
  //     var date, encUsername, location, urlWithHeader;
  //     encUsername = POS.encrypt(user.username);
  //     urlWithHeader = formatUrl(url) + '?' + encUsername;
  //     location = POS.Locations.findOne({
  //       name: user.currentLocationName
  //     });
  //     date = moment(new Date()).format('MMMM Do YYYY');
  //     return POS.createEmailTemplate('onboard', user, location, urlWithHeader, date);
  //   };
  // }
  if ((ref4 = Accounts.emailTemplates) != null) {
    ref4.resetPassword.subject = function(user) {
      return "Reset Your Password for sharExpense, " + user.username;
    };
  }
  // if ((ref5 = Accounts.emailTemplates) != null) {
  //   ref5.resetPassword.html = function(user, url) {
  //     var date;
  //     date = moment(new Date()).format('MMMM Do YYYY');
  //     return POS.createEmailTemplate('reset', user, null, formatUrl(url), date);
  //   };
  // }
  return c.stop();
});

if (Meteor.isServer) {
  Meteor.startup(function() {
    console.log('were starting shit up', Meteor.settings);
    return process.env.MAIL_URL = Meteor.settings.MAIL_URL;
  });
}

if (Meteor.isClient) {
  Accounts.onEnrollmentLink(function(token, done) {
    console.log('about to set enrollmentToken in hook [Session]', Session);
    // enrollmentToken used on client for setting initial pw
    return Session.set('enrollmentToken', token)
  });
  Accounts.onResetPasswordLink(function(token, done) {
    return Session.set('resetPasswordToken', token);
  });
}

formatUrl = function(url) {
  var beginning;
  beginning = url.substr(0, url.indexOf('.'));
  if (_.includes(['pos', 'pos-testing', ""], beginning)) {
    return url;
  }
  return url.replace(beginning, beginning + '.pos');
};
