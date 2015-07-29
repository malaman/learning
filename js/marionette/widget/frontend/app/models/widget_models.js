define(function (require) {
  'use strict';
  var Backbone = require('backbone');
  var $ = require('jquery');

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


      var API = {
        getAllActiveManufacturers: function() {
          var manufacturers = new self.ManufacturerCollection();
          var defer = $.Deferred();
          manufacturers.fetch({ success: function(data) {
            defer.resolve(data);
          }});
          return defer.promise();
        },
        getManufacturers: function(params) {
          var manufacturers = new self.ManufacturerCollection();
          var defer = $.Deferred();
          manufacturers.fetch({
            url: app.api.baseUrl + '/api/getManufacturer',
            data: $.param(params),
            success: function(data) {
              defer.resolve(data);
          }});
          return defer.promise();

        },
        getYears: function() {
          return new this.YearCollection([{id: 2015}, {id: 2014}, {id: 2013}, {id: 2012}, {id: 2000}]);
        },
        getModels: function(params) {
          return new self.ModelCollection(params);
        }
      };


      app.reqres.setHandler('widget:manufacturers', function() {
        return API.getAllActiveManufacturers();
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

    });

  };
});