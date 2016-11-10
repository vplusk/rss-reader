var App = angular.module('myApp', []);

angular.module('myApp')
	.controller('FeedCtrl', function($scope, $http, rssReaderFactory) {
	
	$scope.rss = [];	

	rssReaderFactory.getChannels().then(function(data) {
		$scope.channels = data;		
	});

	$scope.showChannel = function(index) {		
		rssReaderFactory.getRss(index).then(function(data) {
			$scope.rss = data;
		})
	};

	$scope.removeChannel = function(index) {		
		rssReaderFactory.removeChannel(index).then(function(data) {
			$scope.channels = data;
		})
	};

	$scope.showNews = function(title, description, image, url) {
		$scope.message = true;
		$scope.item = {
			title: title,
			description: description,
			image: image,
			url: url
		};
		$scope.myData = $scope.item.title;
	};

	$scope.addChannel = function() {
		
		var newUrl = {
			name : $scope.name,
			url: $scope.address
		};

		console.log(newUrl);
		rssReaderFactory.addChannel(newUrl).then(function(data) {
			console.log('hey');
		})
		$scope.channels.push(newUrl);
	}	
});

angular.module('myApp')
.filter('toHTML', function ($sce) {
	return function (input) {
		return  $sce.trustAsHtml(input);
	};
});

angular.module('myApp')
.factory('rssReaderFactory', function($http, $q) {
	
	return	{
		getChannels: function() {
				var deferred = $q.defer();
				$http({ 
					method: "GET", 
					url: "/channels" 
				}).success(function (data, status, headers, config) {
					deferred.resolve(data);
				}).error(function (data, status, headers, config) {
					deferred.reject(status);
				});
				return deferred.promise;
		},

		getRss: function (index) {
				var deferred = $q.defer();
				$http({ 
					method: "GET", 
					url: "/channels/" + index
				}).success(function (data, status, headers, config) {
					deferred.resolve(data);
				}).error(function (data, status, headers, config) {
					deferred.reject(status);
				});
				return deferred.promise;
		},

		removeChannel: function (index) {
			var deferred = $q.defer();
				$http({ 
					method: "DELETE", 
					url: "/delete/" + index
				}).success(function (data, status, headers, config) {
					deferred.resolve(data);
				}).error(function (data, status, headers, config) {
					deferred.reject(status);
				});
				return deferred.promise;
		},

		addChannel: function(newUrl) {	
				var deferred = $q.defer();
				$http({ 
					method: "POST", 
					url: "/channels/",
					data: newUrl
				}).success(function (data, status, headers, config) {
					deferred.resolve(data);
				}).error(function (data, status, headers, config) {
					deferred.reject(status);
				});
				return deferred.promise;
		}
	}	
})