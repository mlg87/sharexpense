Template.navbar.reactiveVars
  withTemplateHelper:
    links: []

Template.navbar.onCreated ->
  @autorun =>
    # $('.dropdown-button').dropdown()

    links =
      if Meteor.user()
        [
          {value: 'home'}
          {value: 'account', id: 'account-options', dropdown: true, options: USER_ACCOUNTS_OPTIONS}
          {value: 'search'}
        ]
      else
        [
          {value: 'login'}
        ]
    @links.set links

USER_ACCOUNTS_OPTIONS = [
  {value: 'profile'}
  {value: 'friends'}
  {value: 'spending'}
  {divider: true}
  {value: 'logOut'}
]


# Template.navbar.helpers
#  links: ->
#    if Meteor.user()
#      [
#        {value: 'home'}
#        {value: 'account'}
#        {value: 'search'}
#      ]
#    else
#      [
#        {value: 'login'}
#      ]
