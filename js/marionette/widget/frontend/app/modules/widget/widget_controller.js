define(function (require) {
  'use strict';
  var Marionette = require('marionette');
  var WidgetView = require('./views/step1');
  var $ = require('jquery');

  return Marionette.Controller.extend({
    initialize: function (options) {
      this.app = options.app;
      this.logger = options.logger;

      this.selectedYear = null;
      this.selectedManufacturer = null;
      this.manufacturers = [];
    },
      index : function () {
        var self = this;
        var years;
        var yearsPromise = this.app.request('widget:years');
        var manufacturersPromise = this.app.request('widget:manufacturers');
        var promises = [yearsPromise, manufacturersPromise];
        this.initialize(this.options);

        $.when(yearsPromise).done(function(data) {
          years = data;
        });

        $.when(manufacturersPromise).done(function(data) {
          self.manufacturers = data;
        });
        $.when.apply($, promises).then(function() {
          var Step1View = new WidgetView({
            manufacturers: self.manufacturers,
            years: years,
            selectedYear: self.selectedYear,
            selectedManufacturer: self.selectedManufacturer
          });
          Step1View.on('step1:yearChanged', function(event) {
            self.selectedYear = event.target.value;
            var manufacturerPromise = self.app.request('widget:getManufacturer', {year: self.selectedYear});

            $.when(manufacturerPromise).done(function(data) {
              self.manufacturers = data;
            });

          });
          Step1View.on('step1:manufacturerChanged', function(event) {
            self.selectedManufacturer = {
              id:event.target.value,
              ru_name: $(event.target).find('option:selected').text()};
          });
          self.app.container.show(Step1View);
        });
      }
  });

});