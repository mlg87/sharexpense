# Meteor.publish 'users', (query={}, options={}) ->
#   return @ready() unless @userId?
#   # SECURITY - user can only see users from the same client
#   # user = SE.Users.findOne {_id: @userId}
#
#   POS.Users.find query, options
