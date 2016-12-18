var fs = require('fs')
var path = require('path')
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.resolve(__dirname, 'server.js'),

  output: {
    filename: 'server.bundle.js'
  },

  target: 'node',
  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

    module: {
        loaders: [
          { test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react' },
            {
                test: /\.scss$/,
                include: /src/,
                loaders: "style!css!autoprefixer!sass"
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url' }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]

}