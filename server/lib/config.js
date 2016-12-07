// set the global namespace
this.SE = {};

// login tokens expire after one day
Accounts.config(function() {
  return {
    loginExpirationInDays: 1
  };
});
