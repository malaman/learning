define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

      template : require('text!./../templates/widget_select.hbs'),

      collectionEvents: {
        'reset': 'render'
      },

      events: {
        'change': 'itemChanged'
      },

      itemChanged: function(event) {
        var eventName = ''+this.options.step + ':' + this.options.caption + 'Changed';
        console.log(eventName);
        this.trigger(eventName, event);
      },

      onRender: function() {
      },

      serializeData : function () {
        return {
          step     : this.options.step,
          caption: this.options.caption,
          items  : this.options.collection
        };
      }
  });

});