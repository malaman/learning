const path = require('path');

const express = require('express');
const config: any = require('./webpack.config');
const webpack: any = require('webpack');
const webpackMiddleware: any = require('webpack-dev-middleware');
const app = express();
const compiler: any = webpack(config);


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/assets', express.static(__dirname + '/../assets'));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3020, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://0.0.0.0:3020');
});
