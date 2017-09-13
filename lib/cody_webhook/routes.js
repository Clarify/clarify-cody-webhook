'use strict';
// Load modules
const Joi = require('joi');
const Controller = require('./controller');


exports.endpoints = function(config) {

    return [

        {
            method: 'post',
            path: '/cody_webhook',
            config: {

                id: 'cody_webhook',

                auth: undefined,

                validate: {

                    // We do some validation to ensure the post content is correct and usable.
                    payload: Joi.object({
                        conversation_id: Joi.string().guid().required(),
                        _links: Joi.object({
                            self: Joi.object({
                                href: Joi.string().min(4).max(256).required()
                            }).unknown(true).required()
                        }).unknown(true).required()
                    }).unknown(true)
                },

                description: 'Cody notify webhook',

                notes: [
                    'When Clarify CoDy completes processing a conversation, the conversation is POSTed ' +
                        'to this endpoint.',
                    'The POST body is conversation JSON, identical to the JSON returned from a GET ' +
                        'conversation request to the Cody API server.'
                ],

                tags: ['webhook'],

                handler: function (request, reply) {
                    var app = this;

                    var controller = new Controller(request, app);

                    controller.processConversation(request.payload, function(err, result) {

                        // NOTE: If there is an error (non-200 level status),
                        // it will trigger Clarify to resend the webhook.
                        if (err) {
                            reply(err);
                        } else {
                            reply({'webhook':'ok'}).code(200);
                        }
                    });
                }
            }
        }
    ];
};
