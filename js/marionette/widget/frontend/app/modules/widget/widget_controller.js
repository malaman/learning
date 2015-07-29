define(function (require) {
  'use strict';
  var Marionette = require('marionette');
  //var WidgetView = require('./views/step1');
  var YearsView = require('./views/years_view');
  var ManufacturersView = require('./views/manufacturers_view');
  var ModelsView = require('./views/models_view');
  var ButtonView = require('./views/button_view');
  var WidgetSelectView = require('./views/widget_select_view');
  var $ = require('jquery');

  return Marionette.Controller.extend({
    initialize: function (options) {
      this.app = options.app;
      this.logger = options.logger;

      this.years = [];
      this.manufacturers = [];
      this.models = [];
      this.series = [];
      this.selectedYear = null;
      this.selectedManufacturer = null;
      this.selectedModel = null;
    },

    step1: function() {
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
        var buttonView = new ButtonView({
          buttonCaption: 'Next'
        });
        self.app.second.show(manufacturersView);
        self.app.third.show(modelsView);
        self.app.fourth.show(buttonView);

        yearsView.on('step1:yearChanged', function(event) {
          self.selectedYear = event.target.value;
          var manufacturersPromise = self.app.request('widget:getManufacturers', {year: self.selectedYear});

          $.when(manufacturersPromise).done(function(data) {
            self.manufacturers.reset(data.models);
          });
        });

        manufacturersView.on('step1:manufacturerChanged', function(event) {
          self.selectedManufacturer = {
            id:event.target.value,
            ru_name: $(event.target).find('option:selected').text()
          };
          var modelsPromise = self.app.request('widget:getModels', {manufacturer: self.selectedManufacturer.id,
            year: self.selectedYear});
          $.when(modelsPromise).done(function(data) {
            self.models.reset(data);
            if (self.models.length === 1) {
              self.selectedModel = self.models.models[0].attributes;
            }
          });
        });
        modelsView.on('step1:modelChanged', function(event) {
          self.selectedModel = {
            id:event.target.value,
            ru_name: $(event.target).find('option:selected').text()
          };
          var seriesPromise = self.app.request('widget:getSeries', {
            model: self.selectedModel.id,
            year: self.selectedYear
          });
          $.when(seriesPromise).done(function(data) {
            self.series = new self.app.models.SeriaCollection(data);
            console.log('series');
            console.log(self.series);
          });

        });


        buttonView.on('step1:buttonClicked', function() {
          self.step2();
        });

      });
    },

    step2: function() {
      var self = this;
      var seriesView = new WidgetSelectView({
        collection: self.series,
        caption: 'seria',
        step: 'step2'
      });
      self.app.first.show(seriesView);

      console.log(self.selectedYear);
      console.log(self.selectedManufacturer);
      console.log(self.selectedModel);


    },

    index : function () {
      this.step1();
    }
  });

});