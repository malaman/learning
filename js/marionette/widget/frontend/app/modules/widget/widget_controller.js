define(function (require) {
  'use strict';
  var Marionette = require('marionette');
  var WidgetView = require('./views/step1');
  var ManufacturerCollection = require('../../models/manufacturer');
  //var $ = require('jquery');

  return Marionette.Controller.extend({
    initialize: function (options) {
      this.app = options.app;
      this.logger = options.logger;
    },
      index : function () {
        var manufacturers = new ManufacturerCollection();
        var self = this;
        manufacturers.fetch({success: function() {
          var Step1View = new WidgetView({
          collection: manufacturers
          });

          Step1View.on('step1:event', function(params) {
            console.log(params);
          });
          self.app.container.show(Step1View);
        }});
      }
  });

});