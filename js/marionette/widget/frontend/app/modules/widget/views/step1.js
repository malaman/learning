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
            console.log(this);
            var items = this.collection.toJSON();
            console.log(items);
            return {
                'items' : items
            };
        }
    });

});