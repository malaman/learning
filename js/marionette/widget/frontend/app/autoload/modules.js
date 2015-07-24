define(function (require) {
    'use strict';

    return function (app) {
        /** Autoload modules */

        require('modules/home/module')(app);
        require('modules/widget/widget_module')(app);
    };

});

