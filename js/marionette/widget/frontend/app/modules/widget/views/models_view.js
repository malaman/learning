define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

      template : require('text!./../templates/models.hbs'),

      events: {
        'change .js-model': 'modelChanged'
      },

      collectionEvents: {
      'reset': 'render'
      },

      initialize: function() {

      },

      modelChanged: function(event) {
        this.trigger('step1:modelChanged', event);
      },

      onRender: function() {
      }
  });

});