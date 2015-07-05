// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function(app) {
	// Load the 'todo' controller
	var todo = require('../controllers/todo.server.controller');

	// Mount the 'todo' controller's 'render' method
	app.get('/todo', todo.render);

	// Set up the 'todo' base routes 
	app.route('/api/todo')
	   .get(todo.list)
	   .post(todo.create);
	
	// Set up the 'todo' parameterized routes
	app.route('/api/todo/:todoId')
	   .get(todo.read)
	   .put(todo.update)
	   .delete(todo.delete);

	// Set up the 'todoId' parameter middleware   
	app.param('todoId', todo.todoByID);
};