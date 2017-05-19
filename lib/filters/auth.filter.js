'use strict';

const { SLACK_VERIFIER } = process.env;

var AuthFilter = {

    isFromSlack: function(req, res, next) {

        var slackToken = req.body.token;

        if (!slackToken || slackToken !== SLACK_VERIFIER) {

            var err = new Error('Unauthorized');
            err.status = 401;
            return next(err);

        }

        next();

    },

    isTeamAllowed: function(req, res, next) {

        // TODO: check if team is permitted

        next();

    }

};

module.exports = AuthFilter;
