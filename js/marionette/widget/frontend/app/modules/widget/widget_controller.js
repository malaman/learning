define(function (require) {
  'use strict';
  var Marionette = require('marionette');
  //var WidgetView = require('./views/step1');
  var YearsView = require('./views/years_view');
  var ManufacturersView = require('./views/manufacturers_view');
  var ModelsView = require('./views/models_view');
  var $ = require('jquery');

  return Marionette.Controller.extend({
    initialize: function (options) {
      this.app = options.app;
      this.logger = options.logger;

      this.selectedYear = null;
      this.selectedManufacturer = null;
      console.log(this.app);
    },
      index : function () {
        //console.log(this);
        var self = this;
        var yearsPromise = this.app.request('widget:getYears');
        var manufacturersPromise = this.app.request('widget:manufacturers');
        var promises = [yearsPromise, manufacturersPromise];
        self.models = new self.app.models.ModelCollection([{id: 0, ru_name: 'Please select model'}]);

        $.when(yearsPromise).done(function(data) {
          self.years = new self.app.models.YearCollection(data);
        });
        $.when(manufacturersPromise).done(function(data) {
          self.manufacturers = data;
        });
        $.when.apply($, promises).then(function() {

          var yearsView = new YearsView( {
            collection: self.years
          });
          self.app.first.show(yearsView);
          var manufacturersView = new ManufacturersView( {
            collection: self.manufacturers
          });
          var modelsView = new ModelsView({
            collection: self.models
          });
          self.app.second.show(manufacturersView);
          self.app.third.show(modelsView);

          yearsView.on('step1:yearChanged', function(event) {
            self.selectedYear = event.target.value;
            var manufacturersPromise = self.app.request('widget:getManufacturers', {year: self.selectedYear});

            $.when(manufacturersPromise).done(function(data) {
              self.manufacturers.reset(data.toJSON());
            });
          yearsView.on('step1:manufacturerChanged', function(event) {
            console.log(event);
          });
          });




        //
        //  Step1View.on('step1:yearChanged', function(event) {
        //    self.selectedYear = event.target.value;
        //    var manufacturersPromise = self.app.request('widget:getManufacturers', {year: self.selectedYear});
        //
        //    $.when(manufacturersPromise).done(function(data) {
        //      self.manufacturers = data;
        //    });
        //
        //  });
        //
        //  Step1View.on('step1:manufacturerChanged', function(event) {
        //    self.selectedManufacturer = {
        //      id:event.target.value,
        //      ru_name: $(event.target).find('option:selected').text()
        //    };
        //    var modelsPromise = self.app.request('widget:getModels', {manufacturer: self.selectedManufacturer.id,
        //      year: self.selectedYear});
        //    $.when(modelsPromise).done(function(data) {
        //      self.models = data;
        //    });
        //  });
        //
        //  Step1View.on('step1:modelChanged', function(event) {
        //    self.selectedModel = {
        //      id: event.target.value,
        //      ru_name:$(event.target).find('option:selected').text()
        //    };
        //  });
        //
        //  self.app.first.show(Step1View);
        });
      }
  });

});