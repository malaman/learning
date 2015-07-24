define(function (require) {
  'use strict';
  var Marionette = require('marionette');
  var WidgetView = require('./views/step1');
  var $ = require('jquery');

  return Marionette.Controller.extend({
    initialize: function (options) {
      this.app = options.app;
      this.logger = options.logger;
    },
      index : function () {
        this.initialize(this.options);
        var manufacturers = this.app.request('manufacturer:entities');
        var self = this;
        $.when(manufacturers).done(function(manufacturers) {
          var Step1View = new WidgetView({
            collection: manufacturers
          });
          Step1View.on('step1:event', function(params) {
            console.log(params);
          });
          self.app.container.show(Step1View);
        });
      }
  });

});