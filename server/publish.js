Meteor.publish('users', function(query, options) {
  if (query == null) {
    query = {};
  }
  if (options == null) {
    options = {};
  }
  if (this.userId == null) {
    return this.ready();
  }
  return POS.Users.find(query, options);
});
