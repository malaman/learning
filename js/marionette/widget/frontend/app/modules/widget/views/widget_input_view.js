define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

      template : require('text!./../templates/widget_input.hbs'),

      modelEvents: {
        'reset': 'render'
      },

      events: {
        'change': 'itemChanged',
        'keypress' : 'itemChanged'
      },

      itemChanged: function(event) {
        var eventName = ''+ this.options.step + ':' + this.options.caption + 'Changed';
        this.trigger(eventName, event);
      },

      onRender: function() {
      },

      serializeData : function () {
        return {
          step     : this.options.step,
          caption  : this.options.caption.charAt(0).toUpperCase() + this.options.caption.slice(1),
          placeholder    : this.options.placeholder || ''
        };
      }
  });

});