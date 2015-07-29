define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

      template : require('text!./../templates/step1.hbs'),

      events: {
        'change .js-year': 'yearChanged',
        'change .js-manufacturer': 'manufacturerChanged'
      },

      collectionEvents: {
      'change': 'render'
      },

      initialize: function() {

      },

      yearChanged: function(event) {
        this.trigger('step1:yearChanged', event);
      },

      manufacturerChanged: function(event) {
        this.trigger('step1:manufacturerChanged', event);
      },

      onRender: function() {
        console.log(this.model);
      },

      serializeData : function () {
        console.log(this.model);

        return {
          'years': this.options.years,
          'manufacturers' : this.options.manufacturers.toJSON(),
          'models': this.options.models,
          'selectedYear': this.options.selectedYear,
          'selectedManufacturer': this.options.selectedManufacturer,
          'selectedModel': this.options.selectedModel
        };
      }
  });

});