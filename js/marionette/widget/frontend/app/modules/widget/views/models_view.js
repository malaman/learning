define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

      template : require('text!./../templates/models.hbs'),

      events: {
        'change .js-model': 'modelChanged'
      },

      collectionEvents: {
      'change': 'render'
      },

      initialize: function() {

      },

      modelChanged: function(event) {
        this.trigger('step1:manufacturerChanged', event);
      },

      onRender: function() {
        console.log(this.model);
      },

      serializeData : function () {
        console.log(this);
        console.log(this.collection.toJSON());


        return {
          'manufacturers': this.collection.toJSON()
        };
      }
  });

});