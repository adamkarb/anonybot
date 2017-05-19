'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var express = require('express');
var Router = new express.Router();
var AuthFilter = require(`${ROOT_DIR}/lib/filters/auth.filter`);
var StringFilter = require(`${ROOT_DIR}/lib/filters/string.filter`);
var AnonybotController = require(`${ROOT_DIR}/lib/controllers/anonybot.controller`);

Router.use(AuthFilter.isFromSlack, AuthFilter.isTeamAllowed);

Router.post('/', StringFilter.trimText, StringFilter.extractTarget, (req, res, next) => {

    var targetThread = req._to_target;
    var message = req._message;

    AnonybotController.sendMessage(targetThread, message)
    .then((results) => {

        res.send({
            response_type: 'ephemeral',
            text: 'I will take care of this for you...'
        });

    })
    .catch(next);

});

module.exports = Router;
