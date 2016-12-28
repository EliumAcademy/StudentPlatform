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

// set up webpack dev server and hot reload
app.use(webpack.middleware)
app.use(webpack.hotMiddleware)

app.use(logger('dev'));

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

serverStatic(app, express)

app.set('view engine', 'ejs')


// serve main entry with react
app.get("/", function(req,res){
    res.send(
        `
        <body>
            <div id="reactApp"></div>
            <script type="text/javascript" src="/public/bundle.js"></script>
        </body>
            `
        )
})




var port = serverTools.normalizePort(process.env.PORT || '3000');
app.set('port', port);
app = http.createServer(app);

app.listen(port, process.env.IP);

app.on('error', serverTools.onError(app));
app.on('listening', serverTools.onListening(app));

module.exports = app;


/*
// stuff for hotloading required packages!!!
// set up watcher for front end 
const watcher = require('chokidar').watch(pathTo.nodeRoot("app", "frontEnd"));

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /frontEnd/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\][\/\\]/.test(id)){
            toConsole(id, /[\/\\]frontEnd[\/\\]/.test(id), require.cache[id])
            delete require.cache[id];
        }
    });
  });
});

webpack.compiler.plugin('done', function() {
  console.log("Clearing /frontEnd/ module cache from client");
  Object.keys(require.cache).forEach(function(id) {
    if (/[\/\\]frontEnd[\/\\]/.test(id)) delete require.cache[id];
  });
});
*/



//pass routes to server
//passRoutesTo(app);

