define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

        template : require('text!./../templates/step1.hbs'),

        events: {
          'change .js-year': 'yearChanged',
          'change .js-manufacturer': 'manufacturerChanged'
        },

        modelEvents: {
        'change': 'render'
        },

        yearChanged: function(event) {
          this.trigger('step1:yearChanged', event);
        },

        manufacturerChanged: function(event) {
          this.trigger('step1:manufacturerChanged', event);
        },

        serializeData : function () {
          console.log(this.options);

          return {
            'years': this.options.years,
            'manufacturers' : this.options.manufacturers.toJSON(),
            'selectedYear': this.options.selectedYear

          };
        }
    });

});