//routes

angular.module('todo').config(['$routeProvider',
  function($routeProvider) {
    'use strict';

		var routeConfig = {
			controller: 'TodoController',
			templateUrl: 'todo/templates/todo.index.html'
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: 'https://www.facebook.com.br/'
			});
  }]);