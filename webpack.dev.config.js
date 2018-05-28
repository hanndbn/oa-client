var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = require('./webpack.config.js');    // inherit from the main config file

// disable the hot reload
module.exports.entry = [
    'babel-polyfill',
    __dirname + '/' + module.exports.app_root + '/app/main.jsx'
];

// export css to a separate file
module.exports.module.loaders[1] = {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('css!less')
};
module.exports.plugins.push
(
    new ExtractTextPlugin('./main.min.css')
);
