define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

      template : require('text!./../templates/years.hbs'),

      events: {
        'change .js-year': 'yearChanged'
      },

      collectionEvents: {
      'change': 'render'
      },

      initialize: function() {

      },

      yearChanged: function(event) {
        this.trigger('step1:yearChanged', event);
      },

      onRender: function() {
        console.log(this.model);
      },

      serializeData : function () {
        console.log(this);
        console.log(this.collection.toJSON());


        return {
          'years': this.collection.toJSON(),
          'selectedYear': this.options.selectedYear
        };
      }
  });

});