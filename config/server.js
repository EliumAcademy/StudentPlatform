const express        = require('express');
const path           = require('path');
const http           = require('http');
const logger         = require('morgan');


const serverTools   = require("./server/tools")
const serverStatic  = require("./server/static")
const webpack       = require('./webpack/middleware.js')

// ManageRoutes
//const passRoutesTo = appRequire('routes.js');


let app = express()

app.use(webpack.middleware)
app.use(webpack.hotMiddleware)

app.use(logger('dev'));

serverStatic(app, express)

app.use(function(req, res, next){
    res.locals.imageUrl = function(arg) {
        return "/public/images/" + arg
    }
    res.locals.backgroundImage = function(image){
        return "background-image: url( \'"+res.locals.imageUrl(image)+"\')"
    }
    res.locals.AppRoutes = global.AppRoutes
    next()
})


//app.set('view engine', 'ejs')

//pass routes to server
//passRoutesTo(app);

//require("./server/errors")(app)

var port = serverTools.normalizePort(process.env.PORT || '3000');
app.set('port', port);
app = http.createServer(app);

app.listen(port, process.env.IP);

app.on('error', serverTools.onError(app));
app.on('listening', serverTools.onListening(app));

module.exports = app;
