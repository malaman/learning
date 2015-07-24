define(function (require) {
    'use strict';

    var Controller = require('./widget_controller');
    var Router = require('./widget_router');

    return function (app) {

        app.module('widget', function () {

            /**
             * This modules logger
             * @type {SimpleLogger|Logger|*}
             */
            this.logger = app.lumberman.getLogger('home');

            /**
             * This modules controller
             * @type {*|exports}
             */
            var controller = this.controller = new Controller({ app : app, logger : this.logger, api: this.api, models: this.models});

            /**
             * This modules router
             * @type {Router}
             */
            var router = this.router = new Router({ controller : this.controller });

            /**
             * Commands, basically this modules "public api".
             */
            app.commands.setHandler('navigate:widget', function () {
                controller.index();
                router.navigate('widget');
            });
        });


    };

});