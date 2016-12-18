const webpack = require('webpack')
const config = require('./webpack.config.js')

config["plugins"] = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false
        }
    })
]

config["devtool"] = "source-map"

module.exports = config






/*
new webpack.optimize.UglifyJsPlugin({
  // Don't beautify output (enable for neater output)
  beautify: false,

  // Eliminate comments
  comments: false,

  // Compression specific options
  compress: {
    warnings: false,

    // Drop `console` statements
    drop_console: true
  },

  // Mangling specific options
  mangle: {
    // Don't mangle $
    except: ['$'],

    // Don't care about IE8
    screw_ie8 : true,

    // Don't mangle function names
    keep_fnames: true
  }
})*/