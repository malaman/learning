define(function (require) {
  'use strict';
  var Backbone = require('backbone');
  var _ = require('underscore');

  return function(app) {

    app.module('models', function() {
      var self = this;

      self.Step = Backbone.Model.extend({
        defaults: {
          step: 'step1',
          buttonCaption: 'Next',
          isButtonEnabled: true
        }
      });

      self.Year = Backbone.Model.extend({
      });

      self.Manufacturer = Backbone.Model.extend({
        defaults: {
          id: null,
          ru_name: ''
        }
      });

      self.Model = Backbone.Model.extend({
        defaults: {
          id: null,
          ru_name: ''
        }
      });

      //var Region = Backbone.Model.extend({
      //  defaults: {
      //    id: null,
      //    ru: '',
      //    uk: ''
      //  }
      //});

      self.YearCollection = Backbone.Collection.extend({
        model: this.Year
      });


      self.ManufacturerCollection = Backbone.Collection.extend({
        url: app.api.baseUrl + '/api/getAllActiveManufacturers',
        model: this.Manufacturer
      });

      self.ModelCollection = Backbone.Collection.extend({
        baseUrl: app.api.baseUrl + '/api/getModels',
        model: this.Model
      });

      self.SeriaCollection = Backbone.Collection.extend({
        model: this.Model
      });

      self.ModificationCollection = Backbone.Collection.extend({
        model: this.Model
      });

      self.RegionCollection = Backbone.Collection.extend({
        url: app.api.baseUrl + '/api/getAllRegions',
        model: this.Model,

        parse: function(data) {
          var items = [];
          _.each(data.regions, function(item) {
            var newItem = new self.Model({
              id: item.id,
              ru_name: item.ru,
              uk_name: item.uk
            });
            return items.push(newItem);
          });
          return items;
        }
      });


      app.reqres.setHandler('widget:manufacturers', function() {
        return app.api.getAllActiveManufacturers();
      });

      app.reqres.setHandler('widget:getYears', function() {
        return app.api.getYears();
      });

      app.reqres.setHandler('widget:getManufacturers', function(params) {
        return app.api.getManufacturers(params);
      });

      app.reqres.setHandler('widget:getModels', function(params) {
        return app.api.getModels(params);
      });

      app.reqres.setHandler('widget:getSeries', function(params) {
        return app.api.getSeries(params);
      });

      app.reqres.setHandler('widget:getModifications', function(params) {
        return app.api.getModifications(params);
      });

      app.reqres.setHandler('widget:getRegions', function() {
        return app.api.getRegions();
      });
    });

  };
});