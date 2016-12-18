const browserify   = require('browserify-middleware');
const compileSass  = require('./scssToCss') //taken from express-compile-sass
const compression  = require('compression') // compress assets

const publicPath = pathTo.publicDir();

module.exports = function(app, express){
    //log html requests

    app.use(compression())

    app.use(compileSass({
        root: publicPath,
        sourceMap: true,
        sourceComments: false,
        watchFiles: true,
        logToConsole: false
    }));

    //provide a browserified file at a path
    app.get(
        '/public/js/elium.js',
        browserify(
            pathTo.publicDir("js", 'elium.js'), {
            cache: true,
            precompile: true
            }
        )
    );


    app.use('/public', express.static(publicPath, {maxAge: 30*24*3600000}));
}



