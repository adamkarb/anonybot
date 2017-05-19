'use strict';

const ROOT_DIR = process.env.ROOT_DIR = __dirname;
const SERVER_PORT = process.env.PORT || 7070;

require(`${ROOT_DIR}/env.js`);

// Import Components
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require(`${ROOT_DIR}/config/winston`);
var SlackError = require(`${ROOT_DIR}/lib/util/slackerror`);

// Import Routes
var routes = require(`${ROOT_DIR}/lib/routes/anonybot.route`);

// CORS
app.use((req, res, next) => {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	res.removeHeader('x-powered-by');
	next();

});

app.options('*', (req, res, next) => { res.sendStatus(200); });

app.use(bodyParser.urlencoded({
    limit: '300kb',
    extended: true
}));

// Configure routes
app.use('/', routes);

// Configure Error Handling
app.all('*', (req, res, next) => {

	res.status(404);

    res.send({
		status: res.statusCode,
		message: 'Nothing exists at this route.'
	});

});

app.use((err, req, res, next) => {

	if (err.status == 404 || res.statusCode == 404) { return next(err); }

	var errorStatus = err.status || 500;

	if (res.statusCode == 200) { res.status(errorStatus); }

	return next(err);

});

app.use((err, req, res, next) => {

    if (err instanceof SlackError) {

        var tmp = err.status;
        // Must set status to 200 for slack to accept it
        res.status(200);
        res.send(err.slack_response);
        // Reset error status for pretty logs
        res.status(tmp);

    } else {

        res.send({
            status: res.statusCode,
            message: err.client_message || err.message
        });

    }

    var status = res.statusCode;
	var message = err.message || 'No message';
    var client_message = err.client_message || 'No client_message';
	var stack = err.stack || 'No stack';

	logger.log('error', { status, message, client_message, stack });

	if (err.stack && res.statusCode != 404) { console.log(err.stack); }

});

// Start the server
app.listen(SERVER_PORT, () => {

    console.log(`:: express server listening @ port ${SERVER_PORT} ::`);

});
