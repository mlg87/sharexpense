Router.configure({
  layoutTemplate: 'layout',
  onRun: function() {
    if (!Meteor.userId()) {
      Router.go('login');
    }
    return this.next();
  },
  waitOn: function() {
    if (Meteor.user()) {
      return Meteor.subscribe('users');
    }
  }
});

// Router.route('/', function () {
//   console.log('whats up baby');
//   this.render('layout');
// });

Router.route('/login', {
  name: 'login'
});

Router.route('/home', {
  name: 'home'
});