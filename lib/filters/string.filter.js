'use strict';

const { ROOT_DIR } = process.env;

var SlackError = require(`${ROOT_DIR}/lib/util/slackerror.js`);

var StringFilter = {

    trimText: function(req, res, next) {

        var text = req.body.text;

        if (!text) {

            var err = new SlackError({
                message: 'No text provided.',
                client_message: 'Send in a message please.'
            });

            err.status = 400;

            return next(err);

        }

        text = text.trim();

        req.body.text = text;

        next();

    },

    extractTarget: function(req, res, next) {

        var text = req.body.text;

        var targetMatch = text.match(/<.(.*)>/);

        if (!targetMatch || !targetMatch[1]) {

            var err = new SlackError({
                message: 'No target user or channel provided.',
                client_message: 'You must send to a user or channel!'
            });

            err.status = 400;

            return next(err);

        }

        var messageMatch = text.match(/<.*>(.*)/);

        if (!messageMatch || !messageMatch[1]) {

            var err = new SlackError({
                message: 'No message provided.',
                client_message: 'You must provide a message to send!'
            });

            err.status = 400;

            return next(err);

        }

        var target = targetMatch[1].trim().split('|')[0];
        var message = messageMatch[1].trim();

        req._to_target = target;
        req._message = message;

        next();

    }

};

module.exports = StringFilter;
