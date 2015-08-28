/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import express from 'express';
import serialize from 'serialize-javascript';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import React from 'react';
import app from './app';
import {navigateAction} from 'fluxible-router';
import {getMakersAction} from './actions/MakersActionCreators';
import debugLib from 'debug';
import Html from './components/Html'
import getMakers from './services/getMakers';
import getModels from './services/getModels';
import getSeries from './services/getSeries';
import getModifications from './services/getModifications';

const debug = debugLib('Example');
const HtmlComponent = React.createFactory(Html);
const server = express();

server.set('state namespace', 'App');
server.use('/public', express.static(__dirname + '/build'));
server.use('/style', express.static(__dirname + '/style'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');
// Register our messages REST service
fetchrPlugin.registerService(getMakers);
fetchrPlugin.registerService(getModels);
fetchrPlugin.registerService(getSeries);
fetchrPlugin.registerService(getModifications);
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
        markup: mainMarkup,
        context: context
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
