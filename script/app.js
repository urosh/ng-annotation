angular.module('myApp', []);

angular.module('myApp')
	.directive('myAnnotation', function(){
		return {
			restrict: 'E',
			scope: {},
			replace: true,
			templateUrl: 'template/annotation.tpl.html'
		}
	})

