var debug = require('debug')('{name}:server');
var colors = require("colors")

/**
 * Normalize a port into a number, string, or false.
 */
 module.exports = {
    port: 1, 
    normalizePort: function (val) {
        this.port = parseInt(val, 10);
        if (isNaN(this.port)) { return this.port = val }
        if (this.port >= 0) { return this.port;}
        return false;
    },
    // Event listener for HTTP server "error" event
    onError: (server) => (error) => {
      if (error.syscall !== 'listen') {throw error;}
        var port = this.port
        console.log(this)
        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
          case 'EACCES':
              console.error(bind + ' requires elevated privileges');
              process.exit(1);
              break;
          case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
      }
    },

    //Event listener for HTTP server "listening" event.
    onListening: (server) => () => {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.log((">>>>>>>>>>>>>>>>>>>Listening on " + bind ).green)
        debug('Listening on ' + bind);
    }

}
