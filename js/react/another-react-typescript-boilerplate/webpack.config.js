var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx', '.scss']
  },
  module: {
    loaders: [
        {
            test: /\.tsx?$/,
            loaders: ['awesome-typescript-loader'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.js?/,
            exclude: [/node_modules/, /styles/],
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }
    ]
  }
};
