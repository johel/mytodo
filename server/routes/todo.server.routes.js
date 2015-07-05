// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function(app) {
	// Load the 'todo' controller
	var todo = require('../controllers/todo.server.controller');

	// Mount the 'todo' controller's 'render' method
	app.get('/todo', todo.render);
};