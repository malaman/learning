define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

      template : require('text!./../templates/manufacturers.hbs'),

      events: {
        'change .js-manufacturer': 'manufacturerChanged'
      },

      collectionEvents: {
      'change': 'render'
      },

      initialize: function() {

      },

      manufacturerChanged: function(event) {
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