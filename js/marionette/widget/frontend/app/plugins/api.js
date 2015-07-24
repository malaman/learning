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
          getMaxAge: function() {
            var deferred = $.defer();
            $.ajax(this.baseUrl + '/api/getMaxAge', {})
              .done(function(result) {
                deferred.resolve(result.data);
              })
              .fail(function(data) {
                deferred.reject(data);
              });
            return deferred.promise;
          }
        };
    };
});






