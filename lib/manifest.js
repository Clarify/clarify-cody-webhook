'use strict';
/* eslint no-console: "off" */

var Config = require('../config');

/*
 *
 */

const manifest = {

    server: {
        // debug: {
        //    request: ['error']
        //},
        app: {
            // Store the config so it's accessible to handlers
            config: Config
        }
    },

    connections: [
        {
            host: Config.server.host,
            port: Config.server.port,
            tls: Config.server.tls,
            labels: ['webhook'],
            routes: {
                cors: false
            }
        }
    ],

    registrations: [
        // Common plugins
        {
            plugin: {
                register: 'good',
                options: Config.monitor
            }
        },
        // Add more plugins here for db access etc.

        // Our plugins
        {
            plugin: {
                register: './healthcheck'
            }
        },
        {
            plugin: {
                register: './clarify_cody',
                options: Config.clarify_cody
            }
        },
        {
            plugin: {
                register: './cody_webhook',
                options: {
                    // plugin options
                }
            },
            options: {
                select: 'webhook', // select servers by label to specify which ones use plugin
                routes: {
                    prefix: Config.server.pathPrefix
                }
            }
        }
    ]
};

exports = module.exports = manifest;
