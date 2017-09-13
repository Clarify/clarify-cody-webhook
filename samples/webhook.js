
/**
 * Dependent on clarify-cody sdk module.
 *
 * npm install git+https://git@github.com/Clarify/clarify-cody-node
 *
 */

const ClarifyCody = require('clarify-cody');

var opts = {
    baseUrl: '<<<<<_INSERT_CLARIFY_CODY_API_BASE_URL_>>>>>',
    headers: {
        'User-Agent': 'webhook-controller'
    }
};

const codyClient = new ClarifyCody.Client('<<<<<_CLARIFY_CODY_API_KEY_>>>>>', opts);



/**
 * Handler for POST requests to the webhook url
 */
function webhook_handler(jsonPostPayload, reply) {

    var controller = new Controller();
    controller.processConversation(jsonPostPayload, function(err, result) {

        // NOTE: If there is an error (non-200 level status),
        // it will trigger Clarify to resend the webhook.
        if (err) {
            reply(err);
        } else {
            reply('OK').code(200);
        }
    });
}


/**
 * A controller for a single webhook request.
 *
 */

var Controller = function() {

    this.logger = console;
};


/**
 * Process a conversation received in a webhook.
 *
 * callback(err)
 */
Controller.prototype.processConversation = function(conversation, callback) {
    var self = this;

    self.getInsightsForConversation(conversation, undefined, function (err, insights) {

        if (err) {
            return callback(err);
        }

        self.processMediaInsight(conversation, insights['insight:media'], function(err) {

            if (err) {
                return callback(err);
            }

            var callId = conversation.external_id;

            /////////////////////////////////////////////////////////////////////
            // TODO:
            // Store the insight data.
            /////////////////////////////////////////////////////////////////////

            /*
             * NOTE: Some or all the insights may not be present in the insights obj,
             * in which case the vars below will be undefined.
             */

            /*
            var speech = insights['insight:speech'];
            var keywords = insights['insight:keywords'];
            var transcript = insights['insight:transcript'];
             */

            callback();
        });

    });

};


/**
 * Process the data from the media insight.
 *
 * We log any recording fetch or audio file errors for operational monitoring
 * and troublshooting.
 *
 * Media status can also be stored in a call db in order to expose these kinds of
 * errors to customers (ie. it may signify a misconfigured PBX etc.)
 */
Controller.prototype.processMediaInsight = function(conversation, media, callback) {
    var self = this;

    var conversationId = conversation.conversation_id;
    var callId = conversation.external_id;

    if (!media) {
        // This should never happen.
        self.logger.log(['error'], 'Missing media insight for conversation_id=' + conversationId +
                        ' call_id=' + callId);
        return setImmediate(callback);
    }

    // The participants array will typically have 2 items
    // and media array will only have 1 so we do these loops synchronously
    var participants = media.participants;
    var participantsLen = media.participants.length;

    for (var i=0; i < participantsLen; i++) {

        var participant = participants[i];
        var mediaFiles = participant.media;
        var mediaLen = mediaFiles.length;

        for (var m=0; m < mediaLen; m++) {

            var mediaInfo = mediaFiles[m];

            if (mediaInfo.fetch_code !== 200) {

                // Error downloading the recording file
                self.logger.log(['error'], 'Error downloading recording for conversation_id="' +
                                conversationId + '" call_id="' + callId + '": ' + mediaInfo.fetch_message);

                /////////////////////////////////////////////////////////////////////
                // TODO:
                // May want to store the status of the recording in call db.
                /////////////////////////////////////////////////////////////////////

            } else if (mediaInfo.media_code !== 1000) {

                // Error with the media itself (could relate to this channel only)
                self.logger.log(['error'], 'Media error in recording channel "' + mediaInfo.audio_channel +
                                '" for conversation_id="' + conversationId +
                                '" call_id="' + callId + '": ' + mediaInfo.media_message);

                /////////////////////////////////////////////////////////////////////
                // TODO:
                // May want to store the status of the recording in call db.
                /////////////////////////////////////////////////////////////////////

            }
        }
    }
    return setImmediate(callback);
};


/**
 * Gets the conversation insights for the passed in conversation.
 * insights can be a list of insights, a space separate list of insights as a single string
 * or if falsey, all insights will be fetched.
 *
 * callback(err, insights)
 * insights passed to the callback is an object where the property keys are the
 * insight names with 'insight:' prefix, for example 'insight:media'.
 */
Controller.prototype.getInsightsForConversation = function(conversation, insights, callback) {
    var self = this;

    var qs = {
        embed: insights || '*'  // '*' embeds all insights
    };

    codyClient.getLink(conversation, 'self', qs, function (err, conversationWithEmbeds) {
        if (err) {

            // We could get a 404 if the conversation was deleted but we assume that won't happen
            // because the notify activity gets the conversation from the API server just before sending
            // the webhook and it certainly wouldn't be normal behavior to delete active conversations.
            self.logger.log(['error'], 'Error getting conversation with embeds for conversation_id=' +
                            conversation.conversation_id + ' call_id=' + conversation.external_id + ': ' + err);

            callback(new Error('Error getting conversation with insights'));
        } else {

            // Delete properties that aren't required
            var insightsObj = conversationWithEmbeds._embedded;
            for (var name in insightsObj) {
                if (insightsObj.hasOwnProperty(name)) {
                    var obj = insightsObj[name];
                    delete obj._links;
                    delete obj.conversation_id;
                    delete obj.insight;
                }
            }
            callback(null, insightsObj);
        }
    });
};
