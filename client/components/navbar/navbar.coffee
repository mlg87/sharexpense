Template.navbar.helpers
 links: ->
   if Meteor.user()
     [
       {value: 'home'}
       {value: 'account'}
       {value: 'search'}
     ]
   else
     [
       {value: 'login'}
     ]
