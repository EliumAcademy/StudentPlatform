var path = require('path');
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var rootPath = path.normalize(path.join(__dirname, '../../'))
module.exports = {
    context: rootPath,
    entry:  [
        'webpack-hot-middleware/client',
       './app/frontEnd/index.js'
    ],
    devServer: {
        inline: true
    },
    output: {
        path: path.join(rootPath, "public"),
        filename: 'bundle.js',
        publicPath: "/public"
    },
    plugins:[
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }, {
            test: /\.scss$/,
            include: /src/,
            loaders: "style!css!autoprefixer!sass"
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url'
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000',
        }, {
            test: /\.(eot|ttf|wav|mp3|pdf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
        }]
    }
}