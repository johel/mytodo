// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance
	var app = express();

	//Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Set the application view engine and 'views' folder
	app.set('views', './server/views');
	app.set('view engine', 'ejs');

	// Load the routing files
	require('../server/routes/index.server.routes.js')(app);

	// Configure static file serving
	app.use(express.static('./client'));

	// Return the Express application instance
	return app;
};