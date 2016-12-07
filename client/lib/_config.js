var sAlertError;

this.SE = {};

Blaze.TemplateInstance.prototype.parentInstance = function(templateName) {
  var view;
  if (!/^Template\./.test(templateName)) {
    templateName = 'Template.' + templateName;
  }
  view = this.view;
  while ((view = view.parentView)) {
    if (view.name === templateName) {
      return view.templateInstance();
    }
  }
};

$.fn.extend({
  serializeJSON: function() {
    var form;
    form = {};
    _.each(this.serializeArray(), function(field) {
      return form[field.name] = field.value.trim();
    });
    return form;
  }
});

sAlert.config({
  effect: 'slide'
});

sAlertError = sAlert.error;

sAlert.error = function(err) {
  if (!err) {
    return;
  }
  if (err.error === 'throttle') {
    return;
  }
  if (err.error === 500) {
    return sAlertError.call(sAlert, 'An error occurred. We have been notified. We\'re on it!');
  } else {
    return sAlertError.call(sAlert, err.reason || err);
  }
};
