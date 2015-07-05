// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Todo = mongoose.model('Todo');

// Create a new 'render' controller method
exports.render = function(req, res) {
	// Use the 'response' object to render the 'index' view with a 'title' and a stringified 'user' properties
	res.render('todo', {
		title: 'A fazer'
	});
};


// Create a new error handling controller method
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

// Create a new controller method that creates new todos
exports.create = function(req, res) {
	// Create a new todo object
	console.log(req.body);
	var todo = new Todo(req.body);
	
	
	// Set the todo's 'creator' property
	//todo.creator = req.user;

	// Try saving the todo
	todo.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the todo 
			res.json(todo);
		}
	});
};

// Create a new controller method that retrieves a list of todos
exports.list = function(req, res) {
	// Use the model 'find' method to get a list of todos
	Todo.find().sort('-created').exec(function(err, todos) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the todo 
			console.log(todos);
			res.json(todos);
		}
	});
};

// Create a new controller method that returns an existing todo
exports.read = function(req, res) {
	res.json(req.todo);
};

// Create a new controller method that updates an existing todo
exports.update = function(req, res) {
	// Get the todo from the 'request' object
	var todo = req.todo;

	// Update the todo fields
	todo.title = req.body.title;
	todo.content = req.body.content;

	// Try saving the updated todo
	todo.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the todo 
			res.json(todo);
		}
	});
};

// Create a new controller method that delete an existing todo
exports.delete = function(req, res) {
	// Get the todo from the 'request' object
	var todo = req.todo;

	// Use the model 'remove' method to delete the todo
	todo.remove(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the todo 
			res.json(todo);
		}
	});
};

// Create a new controller middleware that retrieves a single existing todo
exports.todoByID = function(req, res, next, id) {
	// Use the model 'findById' method to find a single todo 
	Todo.findById(id).exec(function(err, todo) {
		if (err) return next(err);
		if (!todo) return next(new Error('Failed to load todo ' + id));

		// If an todo is found use the 'request' object to pass it to the next middleware
		req.todo = todo;

		// Call the next middleware
		next();
	});
};

// // Create a new controller middleware that is used to authorize an todo operation 
// exports.hasAuthorization = function(req, res, next) {
// 	// If the current user is not the creator of the todo send the appropriate error message
// 	if (req.todo.creator.id !== req.user.id) {
// 		return res.status(403).send({
// 			message: 'User is not authorized'
// 		});
// 	}

// 	// Call the next middleware
// 	next();
// };