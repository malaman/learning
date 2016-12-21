declare const require: any;

import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as UniversalRouter from 'universal-router';

import {Html} from './src/components/Html';
import {Root} from './src/containers/Root';
import {routes} from './src/routes';

import { configureStore } from './src/store/configureStore';

const express = require('express');
const config: any = require('./webpack.config');
const webpack: any = require('webpack');
const webpackMiddleware: any = require('webpack-dev-middleware');
const app = express();
const compiler: any = webpack(config);
const store: {dispatch: Function, getState: Function} = configureStore({});


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
server.use('/assets', express.static(__dirname + '/../assets'))

app.get('*', (req, res, next) => {
    if (res.url === '/static/bundle.js' || res.url === '/favicon.ico') {
        return next();
    }
    console.log('req.url: ', req.url);
    UniversalRouter
    .resolve(routes, {path: req.url, dispatch: store.dispatch})
    .then((component) => {
        const ReactComp = (component as React.Component<any, any>);
        const content =  ReactDOM.renderToString(<Root store={store} location={{pathname: req.url}} component={ReactComp}/>);
        const storeState = store.getState();
        const html = ReactDOM.renderToString(<Html content={content} storeState={storeState} />);
        res.set('Content-Type', 'text/html');
        res.send(html);
        res.end();
    });
});

app.listen(3020, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://0.0.0.0:3020');
});
