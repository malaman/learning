define(function () {
    'use strict';

    return function (app) {
      var $ = require('jquery');

      /**
       * Attach your plugin to the instance app here
       * @type {{}}
       */
      app.api = {
        baseUrl: 'http://www.etachki.com',
        getYears: function () {

          var _setYears = function (depth) {
            var currentYear = new Date().getFullYear(),
              firstYear = currentYear - depth,
              last = currentYear + 1;

            var years = [];
            for (var i = firstYear; i != last; i = i + 1) {
              years.push({id:i});
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

        getManufacturers: function (params) {
          var deffered = $.Deferred();
          $.ajax({
            url: this.baseUrl + '/api/getManufacturer',
            data: params
          })
            .then(function (result) {
              deffered.resolve(result);
            });
          return deffered.promise();
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
        }
      };
    };
});






