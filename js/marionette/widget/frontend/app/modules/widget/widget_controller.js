define(function (require) {
  'use strict';
  var Marionette = require('marionette');
  var ButtonView = require('./views/button_view');
  var WidgetInputView = require('./views/widget_input_view');
  var WidgetSelectView = require('./views/widget_select_view');
  var EstimationView = require('./views/estimation_view');
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
      this.odometer = null;
      this.email = null;
      this.regions = [];
    },

    step1: function() {
      var self = this;
      var yearsPromise = this.app.request('widget:getYears');
      var manufacturersPromise = this.app.request('widget:manufacturers');
      var promises = [yearsPromise, manufacturersPromise];
      self.currentStep = new this.app.models.Step({
        step: 'step1',
        isButtonEnabled: false
      });
      self.models = new self.app.models.ModelCollection([{id: 0, ru_name: 'Please select model'}]);
      self.manufacturers = new self.app.models.ManufacturerCollection([{id: 0, ru_name: 'Please select manufacturer'}]);
      self.modifications = new self.app.models.ModificationCollection([{id: 0, ru_name: 'Please select model'}]);

      $.when(yearsPromise).done(function(data) {
        self.years = new self.app.models.YearCollection(data);
        self.selectedYear = self.years.models[0].attributes.id;
      });
      $.when(manufacturersPromise).done(function(data) {
        _.each(data.models, function(item) {
          self.manufacturers.add(item);
        });
      });
      $.when.apply($, promises).then(function() {

        var yearsView = new WidgetSelectView( {
          collection: self.years,
          caption: 'year',
          step: 'step1'
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
          if ( parseInt(self.selectedModel.id, 10) !== 0) {
            var seriesPromise = self.app.request('widget:getSeries', {
              model: self.selectedModel.id,
              year: self.selectedYear
            });
            $.when(seriesPromise).done(function(data) {
              self.currentStep.set({
                step: 'step1',
                isButtonEnabled: true
              });
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
          }
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

    checkStep3Button: function(self) {
      if (self.odometer !== null && self.email !== null && self.selectedRegion.id !== 0) {
        self.currentStep.set({
          step: 'step3',
          isButtonEnabled: true
        });
      }
    },


    step3: function() {
      var self = this;
      self.currentStep.set({
        step: 'step3',
        isButtonEnabled: false
      });
      var regionPromise = self.app.request('widget:getRegions');
      $.when(regionPromise ).done(function(data) {
        data.models.unshift(new self.app.models.Model({id: 0, ru_name: 'Please select region'}));
        self.regions = data;
        var odometerView = new WidgetInputView({
          caption: 'odometer, km.',
          step: 'step3',
          placeholder: 'Please fill odometer info'
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
            id: parseInt(event.target.value, 10),
            ru: $(event.target).find('option:selected').text()
          };
          self.checkStep3Button(self);
        });
        odometerView.on('step3:odometer, km.Changed', function(event) {
          self.odometer = event.target.value;
          self.checkStep3Button(self);
        });

        emailView.on('step3:emailChanged', function(event) {
          self.email = event.target.value;
          self.checkStep3Button(self);
        });
        self.buttonView.on('step3:buttonClicked', function() {
          self.step4();
        });

        self.app.first.show(odometerView);
        self.app.second.show(regionsView);
        self.app.third.show(emailView);
      });
    },

    step4: function() {
      var self = this;
      var params = {
        id: null,
        car: {
          year: self.selectedYear,
          maker: {ru_name: self.selectedManufacturer.ru_name.replace(/\n$/, ''), id: self.selectedManufacturer.id},
          model: {
            ru_name: self.selectedModel.ru_name.replace(/\n$/, ''),
            id: self.selectedModel.id,
            show_price_range: false,
            ignore_price: false},
          seria: {
            ru_name: self.selectedSeria.ru_name,
            id: self.selectedSeria.id
          },
          modification: {ru_name: self.selectedModification.ru_name, id: self.selectedModification.id},
          drivable: true,
          damaged: false,
          commercial_purposes: false,
          loss_flood: false,
          odometer_changed: false,
          accident: false,
          odometer: self.odometer
        },
        utm_source: '',
        region: {id: self.selectedRegion.id},
        contact: {email: self.email, lang: 'ru'},
        clarification: false
      };
      var pricePromise = self.app.api.determinePrice(params);
      $.when(pricePromise).done(function(data) {
        self.estimation = data;
        self.showEstimation();
      });
    },

    showEstimation: function() {
      var self = this;
      var estimationView = new EstimationView({
        estimation: self.estimation
      });
      self.currentStep.set({
        step: 'step5',
        buttonCaption: 'Evaluate Again',
        isButtonEnabled: true
      });
      self.buttonView.on('step5:buttonClicked', function() {
        self.index();
      });

      self.app.first.show(estimationView);
      self.app.second.close();
      self.app.third.close();

    },

    index : function () {
      this.step1();
    }
  });

});