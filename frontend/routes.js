(function() {
	'use strict';
	var module = angular.module('myApp', ['ngRoute']);

	module
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/chat', {
					templateUrl: 'frontend/templates/index.html',
					controller: 'ChatController'
				})
				.otherwise({
					redirectTo: '/chat'
				});
		}]);
})();