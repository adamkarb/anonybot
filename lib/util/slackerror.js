'use strict';

function SlackError(msgTypes) {

    var message = typeof msgTypes === 'string' ? msgTypes : msgTypes.message;

    this.message = message;

    // Assigns a stack trace to this instance
    Error.captureStackTrace(this, SlackError);

    this.client_message = msgTypes.client_message || null;

    this.slack_response = {
        text: 'Uh Oh!',
        attachments: [
            {
                color: '#bf243a',
                text: this.client_message || this.message
            }
        ]
    };

}

SlackError.prototype = Object.create(Error.prototype);
SlackError.prototype.constructor = SlackError;

module.exports = SlackError;
