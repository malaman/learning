define(function () {
    'use strict';

    return function (app) {
      var $ = require('jquery');

      /**
       * Attach your plugin to the instance app here
       * @type {{}}
       */
      app.api = {
        baseUrl: 'http://www.dev3.etachki.com.ua',
        getYears: function () {

          var _setYears = function (depth) {
            var currentYear = new Date().getFullYear(),
              firstYear = currentYear - depth,
              last = currentYear + 1;

            var years = [];
            for (var i = firstYear; i != last; i = i + 1) {
              years.push({id:i, ru_name: i, uk_name: i});
            }
            years.reverse();
            return years;
          };
          var deffered = $.Deferred();

          $.ajax(this.baseUrl + '/api/getMaxAge')
            .then(function (result) {
              var years = _setYears(parseInt(result, 10));
              deffered.resolve(years);
            });
          return deffered.promise();
        },
        getAllActiveManufacturers: function() {
          var manufacturers = new app.models.ManufacturerCollection();
          var defer = $.Deferred();
          manufacturers.fetch({ success: function(data) {
            defer.resolve(data);
          }});
          return defer.promise();
        },
        getManufacturers: function(params) {
          var manufacturers = new app.models.ManufacturerCollection();
          var defer = $.Deferred();
          manufacturers.fetch({
            url: app.api.baseUrl + '/api/getManufacturer',
            data: $.param(params),
            success: function(data) {
              defer.resolve(data);
          }});
          return defer.promise();
        },

        getModels: function(params) {
          var deffered = $.Deferred();
          $.ajax({url: this.baseUrl + '/api/getModels',
           data: params
          })
            .then(function(result) {
              deffered.resolve(result);
            });
          return deffered.promise();
        },
        getSeries: function(params) {
          var deffered = $.Deferred();
          $.ajax({url: this.baseUrl + '/api/getSeries',
           data: params
          })
            .then(function(result) {
              deffered.resolve(result);
            });
          return deffered.promise();
        },
        getModifications: function(params) {
          var deffered = $.Deferred();
          $.ajax({url: this.baseUrl + '/api/getBody',
           data: params
          })
            .then(function(result) {
              deffered.resolve(result);
            });
          return deffered.promise();
        },
        getRegions: function() {
          var manufacturers = new app.models.RegionCollection();
          var defer = $.Deferred();
          manufacturers.fetch({
            success: function(data) {
              defer.resolve(data);
          }});
          return defer.promise();
        },
        determinePrice: function(params) {
          var deffered = $.Deferred();
          $.ajax({
            url: this.baseUrl + '/api/determine_price',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(params)
          })
            .then(function(result) {
              deffered.resolve(result);
            });
          return deffered.promise();
        }

      };
    };
});






