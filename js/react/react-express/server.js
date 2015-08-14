/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import app from './app';
import HtmlComponent from './components/Html';
import pg from 'pg';
import {conString} from './configs/secret';
import bodyParser from 'body-parser';


const htmlComponent = React.createFactory(HtmlComponent);
const debug = debugLib('catalog');
const server = express();
let   makers = [];

server.set('state namespace', 'App');


pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * from "etachka_maker" limit 10', null, function(err, result) {
    done();
    if (err) {
      return console.error('error running query', err);
    }
    makers = result.rows;
  });
});


server.use(bodyParser.json());
// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');
// Register our messages REST service
fetchrPlugin.registerService(require('./services/getMakers'));
// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());


server.use('/public', express.static(path.join(__dirname, '/build')));



server.use((req, res, next) => {
    let context = app.createContext();

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const html = React.renderToStaticMarkup(htmlComponent({
            context: context.getComponentContext(),
            state: exposed,
            markup: React.renderToString(context.createElement()),
            makers: makers
        }));

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);

export default server;
