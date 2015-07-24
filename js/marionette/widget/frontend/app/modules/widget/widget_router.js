define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    var Router = Marionette.AppRouter.extend({

        appRoutes: {
            'widget' : 'index'
        }
    });

    return Router;

});
