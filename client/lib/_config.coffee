# set the global namespace
@SE = {}

# Allow accessing parent template's instance by it's name
# -------------------------------------------------------
Blaze.TemplateInstance.prototype.parentInstance = (templateName) ->
  unless /^Template\./.test(templateName)
    templateName = 'Template.' + templateName;
  view = @view
  while (view = view.parentView)
    if (view.name is templateName)
      return view.templateInstance()

$.fn.extend
  serializeJSON: ->
    form = {}
    _.each @serializeArray(), (field) ->
      form[field.name] = field.value.trim()
    form

# sAlert
# ------
sAlert.config
  effect: 'slide'

sAlertError = sAlert.error

sAlert.error = (err) ->
  return unless err
  return if err.error is 'throttle'
  if err.error is 500
    sAlertError.call sAlert, 'An error occurred. We have been notified. We\'re on it!'
  else
    sAlertError.call sAlert, err.reason or err
