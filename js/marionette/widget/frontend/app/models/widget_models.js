define(function (require) {
  'use strict';
  var Backbone = require('backbone');

  return function(app) {

    app.module('models', function() {
      var self = this;

      self.Year = Backbone.Model.extend({
      });

      var Manufacturer = Backbone.Model.extend({
        defaults: {
          id: null,
          ru_name: ''
        }
      });

      var Model = Backbone.Model.extend({
        defaults: {
          id: null,
          ru_name: ''
        }
      });

      self.YearCollection = Backbone.Collection.extend({
        model: this.Year
      });


      self.ManufacturerCollection = Backbone.Collection.extend({
        url: app.api.baseUrl + '/api/getAllActiveManufacturers',
        model: Manufacturer
      });

      self.ModelCollection = Backbone.Collection.extend({
        baseUrl: app.api.baseUrl + '/api/getModels',
        model: Model
      });

      self.SeriaCollection = Backbone.Collection.extend({
        model: Model
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

    });

  };
});