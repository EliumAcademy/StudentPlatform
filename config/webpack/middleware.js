const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const middleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware")

const compiler = webpack(webpackConfig);



module.exports.middleware = middleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
});

module.exports.hotMiddleware = hotMiddleware(compiler);