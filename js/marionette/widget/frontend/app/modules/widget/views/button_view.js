define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

      template : require('text!./../templates/widget_button.hbs'),

      events: {
        'click': 'buttonClicked'
      },


      buttonClicked: function(event) {
        this.trigger('step1:buttonClicked', event);
      },

      serializeData : function () {
        return {
          'buttonCaption': this.options.buttonCaption
        };
      }
  });

});