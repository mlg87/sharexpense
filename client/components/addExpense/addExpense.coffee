Template.addExpense.onCreated ->
  console.log 'sup girl'

Template.addExpense.events
  'click .accept': (e, inst) ->
    console.log 'our button was just clicked'
