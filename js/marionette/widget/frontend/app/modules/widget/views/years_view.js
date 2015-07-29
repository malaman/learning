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
      }

  });

});