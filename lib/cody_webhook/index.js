'use strict';

const Routes = require('./routes');


exports.register = function (server, options, next) {

    var config = server.settings.app.config;

    var app = {
        config: config,
        // Add extra shared resources here that will be available in route handlers.
        codyClient: server.plugins.clarify_cody.client
    };

    server.bind(app);  // binds 'this' in route handlers.

    // Configure the server routes
    server.route(Routes.endpoints(config));

    return next();
};


exports.register.attributes = {
    name: 'cody_webhook',
    dependencies: ['clarify_cody']
};
