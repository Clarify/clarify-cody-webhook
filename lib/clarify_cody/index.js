'use strict';

const ClarifyCody = require('clarify-cody');


exports.register = function (server, options, next) {

    // const logger = server;

    const client = new ClarifyCody.Client(options.apiKey, options.options);

    // Available as: server.plugins.clarify_cody.client
    server.expose('client', client);

    return next();
};


exports.register.attributes = {
    name: 'clarify_cody'
};
