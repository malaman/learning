define(function (require) {
    'use strict';

    return function (app) {
        /** Autoload models */
        require('models/widget_models')(app);
    };

});

