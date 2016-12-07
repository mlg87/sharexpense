var USER_ACCOUNTS_OPTIONS;

Template.navbar.reactiveVars({
  withTemplateHelper: {
    links: []
  }
});

Template.navbar.onCreated(function() {
  return this.autorun((function(_this) {
    return function() {
      var links;
      links = Meteor.user() ? [
        {
          value: 'home'
        }, {
          value: 'account',
          id: 'account-options',
          dropdown: true,
          options: USER_ACCOUNTS_OPTIONS
        }, {
          value: 'search'
        }
      ] : [
        {
          value: 'login'
        }
      ];
      return _this.links.set(links);
    };
  })(this));
});

USER_ACCOUNTS_OPTIONS = [
  {
    value: 'profile'
  }, {
    value: 'friends'
  }, {
    value: 'spending'
  }, {
    divider: true
  }, {
    value: 'logOut'
  }
];
