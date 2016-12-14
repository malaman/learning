import webpack from 'webpack';
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config');
var express = require('express');
var path = require('path');
var React = require('react');
var ReactDOM = require('react-dom/server');
import HTMLSkeleton from './src/components/Html';

var app = express();
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
    const component = <HTMLSkeleton />;
    const html = ReactDOM.renderToString(component);
    res.set('Content-Type', 'text/html');
    res.write(html);
    res.end();
});

app.listen(3020, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://0.0.0.0:3020');
});
