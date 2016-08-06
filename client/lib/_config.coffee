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
