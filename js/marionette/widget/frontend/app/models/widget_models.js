define(function (require) {
  'use strict';
  var Backbone = require('backbone');
  var $ = require('jquery');

  return function(app) {

    app.module('models', function() {

      var Year = Backbone.Model.extend({
      });

      var YearCollection = Backbone.Collection.extend({
        model: Year
      });

      var Manufacturer = Backbone.Model.extend({
        defaults: {
          id: null,
          ru_name: ''
        }
      });

      var ManufacturerCollection = Backbone.Collection.extend({
        url: app.api.baseUrl + '/api/getAllActiveManufacturers',
        model: Manufacturer
      });

      var API = {
        getAllActiveManufacturers: function() {
          var manufacturers = new ManufacturerCollection();
          var defer = $.Deferred();
          manufacturers.fetch({ success: function(data) {
            defer.resolve(data);
          }});
          return defer.promise();
        },
        getYears: function() {
          return new YearCollection([{id: 2015}, {id: 2014}, {id: 2013}, {id: 2012}]);
        }
      };


      app.reqres.setHandler('widget:manufacturers', function() {
        return API.getAllActiveManufacturers();
      });

      app.reqres.setHandler('widget:getYears', function() {
        return API.getYears();
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