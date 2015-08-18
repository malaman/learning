/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('babel/register');
var express = require('express');
var favicon = require('serve-favicon');
var serialize = require('serialize-javascript');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var debug = require('debug')('Example');
var React = require('react');
var app = require('./app');
var HtmlComponent = React.createFactory(require('./components/Html'));
var navigateAction = require('fluxible-router').navigateAction;
import {getMakersAction} from './actions/MakersActionCreators';
//var createElement = require('fluxible-addons-react').createElementWithContext;

var server = express();
server.set('state namespace', 'App');
server.use('/public', express.static(__dirname + '/build'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');
// Register our messages REST service
fetchrPlugin.registerService(require('./services/getMakers'));
// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

function renderPage(req, res, context) {
    debug('Exposing context state');
    var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

    var mainMarkup;
    if ('0' === req.query.render) {
        mainMarkup = '';
    } else {
        mainMarkup = React.renderToString(context.createElement());
    }

    debug('Rendering Application component into html');
    var html = React.renderToStaticMarkup(HtmlComponent({
        state: exposed,
        markup: mainMarkup
    }));

    debug('Sending markup');
    res.send(html);
}

server.use(function (req, res, next) {
    var context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });
    Promise.all([
      context.executeAction(navigateAction, { url: req.url })
    ]).then(() => renderPage(req, res, context, next))
      .catch((err) => {
        if (!err.statusCode || !err.status) {
          next(err);
        }
        else {
          renderPage(req, res, context);
        }
      });

});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
