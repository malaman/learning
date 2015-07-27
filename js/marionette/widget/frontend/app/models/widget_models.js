define(function (require) {
  'use strict';
  var Backbone = require('backbone');
  var $ = require('jquery');

  return function(app) {

    app.module('models', function() {

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
        }
      };


      app.reqres.setHandler('widget:manufacturers', function() {
        return API.getAllActiveManufacturers();
      });

      app.reqres.setHandler('widget:years', function() {
        return app.api.getYears();
      });

      app.reqres.setHandler('widget:getManufacturer', function(params) {
        return app.api.getManufacturer(params);
      });
    });

  };
});