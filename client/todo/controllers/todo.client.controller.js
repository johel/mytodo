angular.module('todo').controller('TodoController',['$scope','$routeParams','Todo', function ($scope, $routeParams, Todo) {
	
		// Monitor the current route for changes and adjust the filter accordingly.
	$scope.$on('$routeChangeSuccess', function () {
		var status = $scope.status = $routeParams.status || '';

		$scope.statusFilter = (status === 'active') ?
			{ finished: false } : (status === 'completed') ?
			{ finished: true } : undefined;
	});

	$scope.todos = [];

	Todo.get().then(function (resp) {
						angular.copy(resp.data, Todo.todos);
						$scope.todos = Todo.todos;
					});

	$scope.$watch('todos', function () {
		$scope.activeCount = $scope.todos.filter(function(item){return item.finished===false;}).length;
		$scope.completedCount = $scope.todos.length - $scope.activeCount;
	}, true);


	$scope.addTodo = function (todo) {
		var newTodo = {};
		angular.copy(todo, newTodo);

		$scope.saving = true;
		todo.finished = false;
		Todo.insert(newTodo)
			.then(function success() {
				$scope.todo.content = "";
				$scope.todo.tag = "";
			}, function error() {
				alert("deu errado!");
			})
			.finally(function () {
				$scope.saving = false;
			});

	};
	
	$scope.deleteTodo = function (todo) {
		var index = $scope.todos.indexOf(todo);
		if(index > -1){
			Todo.delete(todo);
		}
	};

	$scope.saveEdits = function (todo, event) {
		// Blur events are automatically triggered after the form submit event.
		// This does some unfortunate logic handling to prevent saving twice.
		if (event === 'blur' && $scope.saveEvent === 'submit') {
			$scope.saveEvent = null;
			return;
		}

		$scope.saveEvent = event;

			// Todo edits were reverted-- don't save.
			//note que o evento keydown da diretiva acontece primeiro
		if ($scope.reverted) {
			$scope.reverted = null;
			return;
		}

		todo.content = todo.content.trim();
		// se nao houve alteracao, retorna sem fazer nada
		if (todo.content === $scope.originalTodo.content) {
			$scope.editedTodo = null;
			return;
		}


		$scope.editedTodo = null;
		Todo[todo.content ? 'put' : 'delete'](todo)
			.then(function success() {}, function error() {
				todo.content = $scope.originalTodo.content;
			})
			.finally(function () {
				$scope.editedTodo = null;
			});
	};

	$scope.revertEdits = function (todo) {
		$scope.todos[$scope.todos.indexOf(todo)] = $scope.originalTodo;
		$scope.editedTodo = null;
		$scope.originalTodo = null;
		$scope.reverted = true;
	};

	$scope.clearCompletedTodos = function () {
		var todos = $scope.todos.concat(); //shallow copy
		var qtdTotal = todos.length;

		for(var i=0;i<qtdTotal;i+=1){
			var todo = todos[i];
			if (todo.finished) {
				$scope.deleteTodo(todo)
			};
		}
	};

	$scope.markAll = function () {
		if($scope.activeCount===0) {
			$scope.todos.forEach(function(el){
				el.finished=false;
			})
		}
		else{
			$scope.todos.forEach(function(el){
			el.finished=true;
			})
		}
	};

	$scope.edit = function(todo) {
		$scope.editedTodo = todo;

		//extend makes a shallow copy of own properties of one or more source objects
		// aqui "todo" eh um objeto cujas propriedades nao sao objeto, assim a shallow copy iguala deep copy
		//ex: var object = angular.extend({}, object1, object2).
		$scope.originalTodo = angular.extend({}, todo);
	}
	



}]);