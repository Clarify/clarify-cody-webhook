const Pack = require('./package');


module.exports = {

    version: Pack.version,

    server: {
        host: '0.0.0.0',
        port: 10010,
        tls: false,
        pathPrefix: undefined  // Ex. '/v1'
    },

    clarify_cody: {
        apiKey: process.env.CODY_API_KEY,
        options: {
            baseUrl: 'https://cdapi.clarify.io',  // "http(s)://cody-host:port"
            headers: {
                'user-agent': 'cody-webhook'  // String to identify this client
            }
        }
    },

    settings: {
    },

    // hapi good plugin options for logging
    monitor: {
        ops: {
            interval: 60000  // opsspy interval
        },
        responseEvent: 'tail',
        includes: {
            request: [], // 'headers', 'payload'
            response: [] // 'payload'
        },
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    ops: '*',
                    request:'*',
                    response:'*',
                    log: '*',
                    error: '*'
                }]
            }, {
                module: 'good-squeeze',
                name: 'SafeJson',
                args: [{ separator: '\n' }]
            }, 'stdout']

            //  file:  [{
            //     module: 'good-squeeze',
            //     name: 'Squeeze',
            //     args: [{
            //         ops: '*',
            //         request:'*',
            //         response:'*',
            //         log: '*',
            //         error: '*'
            //     }]
            // }, {
            //     module: 'good-squeeze',
            //     name: 'SafeJson',
            //     args: [{ separator: '\n' }]
            // }, {
            //     "module" : "rotating-file-stream",
            //     "args" : [
            //         "api.log",
            //         {
            //             "path" : "./logs",
            //             "size" : "10K",
            //             "interval" : "1d",
            //             "compress" : true
            //         }
            //     ]
            // }]
        }
    }

};
