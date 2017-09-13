'use strict';
/* eslint no-console: "off" */

const Compose = require('./compose');

/*
 *
 */

var internals = {};

Compose((err, server) => {

    if (err) {
        console.log('Error starting services. Aborting server start...');
        throw err;
    }

    internals.server = server;
    exports.server = server;

    server.start(() => {

        server.log(['info'], 'Server started');
    });
});


// callback is optional
exports.serverShutdown = internals.gracefulShutdown = function (callback) {

    var server = internals.server;

    (server || console).log(['info'], 'Server shutdown');

    var _shutdown = function() {

        if (callback && typeof callback === 'function') {
            callback();
        } else {
            process.exit(0);
        }
    };

    if (server) {
        // Stops accepting new connections and waits for existing requests to complete
        server.stop({ timeout: 60 * 1000 }, function() {

            server.log(['info'], 'Exiting.');
            _shutdown();
        });
    } else {
        _shutdown();
    }
};


// Graceful shutdown on TERM signal
process.on('SIGINT', internals.gracefulShutdown);
process.on('SIGTERM', internals.gracefulShutdown);


// Catch the uncaught errors that weren't wrapped in a domain or try catch statement
// Do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {

    console.log(err.stack);
    console.log("Shutting down...");
    internals.gracefulShutdown();
});
