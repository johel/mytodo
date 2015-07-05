// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'articles' module
var todoModule = angular.module('todo', ['ngRoute']);

// Configure the hashbang URLs using the $locationProvider services 
todoModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

// Fix Facebook's OAuth bug
if (window.location.hash === '#_=_') window.location.hash = '#!';

// Manually bootstrap the AngularJS application
angular.element(document).ready(function() {
	angular.bootstrap(document, ['todo']);
});