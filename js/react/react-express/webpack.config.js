var webpack = require('webpack');
//var WebpackErrorNotificationPlugin = require('webpack-error-notification');

module.exports = {
    resolve: {
        extensions: ['', '.js']
    },
    entry: './client.js',
    output: {
        path: './build/js',
        publicPath: '/public/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            //{ test: /\.css$/, loader: 'style!css' },
            { test: /\.scss$/, loaders: ["style", "css", "autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true"] },
            { test: /\.js$/, exclude: /node_modules/, loader: require.resolve('babel-loader') },
            { test: /\.json$/, loader: 'json-loader'}
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    watch: true,
    keepalive: true
};
