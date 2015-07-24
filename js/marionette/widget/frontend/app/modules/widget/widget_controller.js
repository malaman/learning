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
        var self = this;
        var years;
        var manufacturers;
        var yearsPromise = this.app.request('widget:years');
        var manufacturersPromise = this.app.request('widget:manufacturers');
        var promises = [yearsPromise, manufacturersPromise];
        this.initialize(this.options);

        $.when(yearsPromise).done(function(data) {
          console.log('years: ', data);
          years = data;
        });

        $.when(manufacturersPromise).done(function(data) {
          manufacturers = data;
        });
        $.when.apply($, promises).then(function() {
          var Step1View = new WidgetView({
            manufacturers: manufacturers,
            years: years
          });
          Step1View.on('step1:event', function(params) {
            console.log(params);
          });
          self.app.container.show(Step1View);
        });
      }
  });

});