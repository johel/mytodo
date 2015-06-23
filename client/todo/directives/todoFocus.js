angular.module('mytodo')
.directive('todoFocus', function($timeout) {

  function link(scope, element, attrs) {

    scope.$watch(attrs.todoFocus, function(condicao) {
      if (condicao===true) {
        $timeout(function () {
          element[0].focus();
        },0,false)
      }

    });
  }

  return {
    restrict:'A',
    link: link
  };

});