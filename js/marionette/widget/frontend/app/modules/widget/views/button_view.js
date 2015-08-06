define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

      template : require('text!./../templates/widget_button.hbs'),

      events: {
        'click': 'buttonClicked'
      },

      modelEvents: {
        'change': 'render'
      },


      buttonClicked: function(event) {
        var eventName = '' + this.model.attributes.step + ':buttonClicked';
        this.trigger(eventName, event);
      },

      serializeData : function () {
        return {
          'buttonCaption': this.model.attributes.buttonCaption,
          'step': this.model.attributes.step,
          'isEnabled': this.model.attributes.isButtonEnabled
        };
      }
  });

});