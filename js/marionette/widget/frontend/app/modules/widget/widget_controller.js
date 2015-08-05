define(function (require) {
  'use strict';
  var Marionette = require('marionette');
  var YearsView = require('./views/years_view');
  var ManufacturersView = require('./views/manufacturers_view');
  var ModelsView = require('./views/models_view');
  var ButtonView = require('./views/button_view');
  var WidgetInputView = require('./views/widget_input_view');
  var WidgetSelectView = require('./views/widget_select_view');
  var $ = require('jquery');
  var _ = require('underscore');

  return Marionette.Controller.extend({
    initialize: function (options) {
      this.app = options.app;
      this.logger = options.logger;

      this.years = [];
      this.manufacturers = [];
      this.models = [];
      this.series = [];
      this.modifications = [];
      this.selectedYear = null;
      this.selectedManufacturer = null;
      this.selectedModel = null;
      this.selectedModification = null;
    },

    step1: function() {
      var self = this;
      var yearsPromise = this.app.request('widget:getYears');
      var manufacturersPromise = this.app.request('widget:manufacturers');
      var promises = [yearsPromise, manufacturersPromise];
      self.currentStep = new this.app.models.Step({});
      self.models = new self.app.models.ModelCollection([{id: 0, ru_name: 'Please select model'}]);
      self.manufacturers = new self.app.models.ManufacturerCollection([{id: 0, ru_name: 'Please select manufacturer'}]);
      self.modifications = new self.app.models.ModificationCollection([{id: 0, ru_name: 'Please select model'}]);

      $.when(yearsPromise).done(function(data) {
        self.years = new self.app.models.YearCollection(data);
      });
      $.when(manufacturersPromise).done(function(data) {
        _.each(data.models, function(item) {
          self.manufacturers.add(item);
        });
      });
      $.when.apply($, promises).then(function() {

        var yearsView = new YearsView( {
          collection: self.years
        });
        self.app.first.show(yearsView);
        var manufacturersView = new WidgetSelectView( {
          collection: self.manufacturers,
          caption: 'manufacturer',
          step: 'step1'
        });
        var modelsView = new WidgetSelectView({
          collection: self.models,
          caption: 'model',
          step: 'step1'
        });
        self.buttonView = new ButtonView({
          model: self.currentStep
        });
        self.app.second.show(manufacturersView);
        self.app.third.show(modelsView);
        self.app.fourth.show(self.buttonView);

        yearsView.on('step1:yearChanged', function(event) {
          self.selectedYear = event.target.value;
          var manufacturersPromise = self.app.request('widget:getManufacturers', {year: self.selectedYear});

          $.when(manufacturersPromise).done(function(data) {
            data.models.unshift(new self.app.models.Manufacturer({id: 0, ru_name: 'Please select manufacturer'}));
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
            data.unshift({id: 0, ru_name: 'Please select model'});
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
            self.selectedSeria = self.series.models[0].attributes;
            var modificationPromise = self.app.request('widget:getModifications', {
              seria: self.selectedSeria.id
            });
            $.when(modificationPromise).done(function(data) {

              self.modifications.reset(data);
              self.selectedModification = self.modifications.models[0].attributes;
            });
          });
        });

        self.buttonView.on('step1:buttonClicked', function() {
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
      var modificationsView = new WidgetSelectView({
        collection: self.modifications,
        caption: 'modification',
        step: 'step2'
      });
      self.currentStep.set({step: 'step2'});
      self.app.first.show(seriesView);
      self.app.second.show(modificationsView);
      self.app.third.close();

      seriesView.on('step2:seriaChanged', function(event) {
        self.selectedSeria = {
          id:event.target.value,
          ru_name: $(event.target).find('option:selected').text()
        };
        var modificationPromise = self.app.request('widget:getModifications', {
            seria: self.selectedSeria.id
          });
          $.when(modificationPromise).done(function(data) {
            self.modifications.reset(data);
            self.selectedModification = self.modifications.models[0].attributes;
          });

      });
      modificationsView.on('step2:modificationChanged', function(event) {
        self.selectedModification = {
          id:event.target.value,
          ru_name: $(event.target).find('option:selected').text()
        };
      });
      self.buttonView.on('step2:buttonClicked', function() {
        self.step3();
      });

    },



    step3: function() {
      var self = this;
      self.currentStep.set({step: 'step3'});
      var regionPromise = self.app.request('widget:getRegions');
      $.when(regionPromise ).done(function(data) {
        self.regions = data;
        var odometerView = new WidgetInputView({
          caption: 'odometer',
          step: 'step3'
        });
        var regionsView = new WidgetSelectView({
          collection:self.regions,
          caption: 'region',
          step: 'step3'
        });
        var emailView = new WidgetInputView({
          caption: 'email',
          step: 'step3',
          placeholder: 'Please enter your email'
        });
        self.selectedRegion = self.regions.models[0].attributes;
        regionsView.on('step3:regionChanged', function(event) {
          self.selectedRegion = {
            id:event.target.value,
            ru: $(event.target).find('option:selected').text()
          };
        });
        odometerView.on('step3:odometerChanged', function(event) {
          self.odometer = event.target.value;
        });

        emailView.on('step3:emailChanged', function(event) {
          self.email = event.target.value;
        });
        self.buttonView.on('step3:buttonClicked', function() {
          console.log(self.odometer);
          console.log(self.selectedRegion);
          console.log(self.email);
        });

        self.app.first.show(odometerView);
        self.app.second.show(regionsView);
        self.app.third.show(emailView);
      });

    },

    index : function () {
      this.step1();
    }
  });

});