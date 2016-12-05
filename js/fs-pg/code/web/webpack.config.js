var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
        'Promise': 'es6-promise',
        'fetch': 'exports?self.fetch!whatwg-fetch'
    }),
 ],
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
