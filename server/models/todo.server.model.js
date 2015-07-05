// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Define a new 'TodoSchema'
var TodoSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	tag: {
		type: String,
		default: '',
		trim: true
	},
	content: {
		type: String,
		default: '',
		trim: true,
		required: 'Content cannot be blank'
	},
	finished: {
		type: Boolean,
		default:false
	}
});

// Create the 'Todo' model out of the 'TodoSchema'
mongoose.model('Todo', TodoSchema);