define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

      template : require('text!./../templates/manufacturers.hbs'),

      collectionEvents: {
        'reset': 'render'
      },

      events: {
        'change .js-manufacturer': 'manufacturerChanged'
      },


      manufacturerChanged: function(event) {
        this.trigger('step1:manufacturerChanged', event);
      },

      onRender: function() {
        console.log(this.collection);
      }

      //serializeData : function () {
      //  console.log(this.model.length);
      //  console.log(this.model.toJSON());
      //
      //
      //  return {
      //    'manufacturers': this.model.toJSON()
      //  };
      //}
  });

});