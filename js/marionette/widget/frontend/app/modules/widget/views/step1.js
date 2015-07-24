define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

        template : require('text!./../templates/step1.hbs'),

        events: {
          'change': 'selectChanged'
        },

        selectChanged: function(event) {
          this.trigger('step1:event', event.target.value);
        },

        serializeData : function () {
          var manufacturers = this.options.manufacturers.toJSON();
          var years = this.options.years;
          console.log(this);

          return {
            'manufacturers' : manufacturers,
            'years': years
          };
        }
    });

});