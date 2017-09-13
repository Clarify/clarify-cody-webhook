'use strict';


exports.register = function (server, options, next) {

    var endpoints = [
        {
            method: 'get',
            path: '/hc',
            config: {
                id: 'get_hc',
                description: 'Healthcheck',
                notes: [],
                tags: ['healthcheck'],

                handler: function (request, reply) {

                    return reply('OK').type('text/plain').code(200);
                }
            }
        }
    ];

    server.route(endpoints);

    return next();
};


exports.register.attributes = {
    name: 'healthcheck'
};
