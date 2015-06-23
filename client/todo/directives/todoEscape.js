angular.module('mytodo')
.directive('todoEscape', function() {
'use strict';

  var ESCAPE_KEY = 27;

  function link(scope, element, attrs) {
    element.bind('keydown', function (event) {
      if(event.keyCode === ESCAPE_KEY) {
        scope.$apply(attrs.todoEscape);
      }
    });

    scope.$on('$destroy', function () {
        element.unbind('keydown');
      }); 
  }

  return {
    restrict:'A',
    link: link
  };

});