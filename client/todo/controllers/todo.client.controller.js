angular.module('todo').controller('TodoController',['$scope','$routeParams','Todo', function ($scope, $routeParams, Todo) {
	
		// Monitor the current route for changes and adjust the filter accordingly.
	$scope.$on('$routeChangeSuccess', function () {
		var status = $scope.status = $routeParams.status || '';

		$scope.statusFilter = (status === 'active') ?
			{ finished: false } : (status === 'completed') ?
			{ finished: true } : undefined;
	});

	$scope.todos = [];

	$scope.todos = Todo.get().success(function (data) {
 		$scope.todos = data;

     });

	$scope.$watch('todos', function () {
		$scope.activeCount = $scope.todos.filter(function(item){return item.finished===false;}).length;
		$scope.completedCount = $scope.todos.length - $scope.activeCount;
	}, true);


	$scope.addTodo = function (todo) {
		$scope.saving = true;
		todo.finished = false;
		Todo.insert(todo)
		.then(function success() {
			var newTodoCopy = JSON.parse(JSON.stringify(todo));
			$scope.todos.push(newTodoCopy);
			$scope.todo.content = "";
			$scope.todo.tag="";
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
			$scope.todos.splice(index,1);
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
		/*store[todo.title ? 'put' : 'delete'](todo)
			.then(function success() {}, function error() {
				todo.title = $scope.originalTodo.title;
			})
			.finally(function () {
				$scope.editedTodo = null;
			});*/
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