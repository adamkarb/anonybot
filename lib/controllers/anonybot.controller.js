'use strict';

const { SLACK_URL, SLACK_AUTH_TOKEN } = process.env;

var request = require('request');

var AnonybotController = {

    sendMessage: function(targetThread, message) {

        return new Promise((resolve, reject) => {

            var reqOpts = {
                url: `${SLACK_URL}/chat.postMessage`,
                method: 'POST',
                form: {
                    // TODO: THIS TOKEN WILL COME FROM A TEAM
                    token: SLACK_AUTH_TOKEN,
                    channel: targetThread,
                    text: message,
                    as_user: false
                }
            };

            request(reqOpts, (err, response, body) => {

                if (err) { return reject(err); }

                if (response.statusCode !== 200) { return reject(body); }

                try {
                    body = JSON.parse(body);
                } catch(e) {
                    return reject(body);
                }

                if (!body.ok) { return reject(body); }

                return resolve(body);

            });

        });

    }

};

module.exports = AnonybotController;
