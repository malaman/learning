var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config');
var express = require('express');
var path = require('path');

var app = express();
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3020, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://0.0.0.0:3020');
});
