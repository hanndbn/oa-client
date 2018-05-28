// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var app_root = 'src'; // the app root folder: src, src_users, etc
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    app_root: app_root, // the app root folder, needed by the other webpack configs
    entry: [
        // http://gaearon.github.io/react-hot-loader/getstarted/
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        __dirname + '/' + app_root + '/app/main.jsx',
    ],
    output: {
        path: '../oa-server/src/main/resources/static/dist/',
        publicPath: 'js/',
        // publicPath: '',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                // test: /\.js$/,
                test: /\.js/,

                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/,
            },
            { test: /\.json$/, loaders: ['json-loader'] },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file!url?limit=100000',
            }
        ],
    },
    devServer: {
        contentBase: __dirname + '/public',
    },
    plugins: [
        new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
            root: __dirname + '/public',
            verbose: true,
            dry: false, // true for simulation
        })
    ],
    resolve: {
        extensions: ['', '.js', '.es6', '.less']
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
