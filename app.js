var app = angular.module('uTemp', [ 'ngRoute', 'firebase']);

app
		.config(function($routeProvider) {
			$routeProvider

			 	.when('/', {
	          templateUrl : 'pages/homeView.html',
	          controller  : 'mainCtrl'
	      })

	      .when('/login', {
	          templateUrl : 'pages/loginView.html',
	          controller  : 'mainCtrl'
	      })

	      .otherwise({
					redirectTo: '/'
				});
	});



app 
	.controller('mainCtrl', function($scope, $http){
		$scope.date = new Date();
		
		var config = {headers: {
			'X-Mashape-Key' : 'Vt18ObzVHymshu7BgkVs9OW36RWnp1J9Z5EjsnaqZM34gYbp3a',
			'Accept' : 'text/plain'
		}};
		$http.get('https://montanaflynn-cat-overflow.p.mashape.com/?limit=1', config)
				.success(function(response){
					$scope.cats = response;
				});

		var config1 = {headers: {
			'X-Mashape-Key' : 'Vt18ObzVHymshu7BgkVs9OW36RWnp1J9Z5EjsnaqZM34gYbp3a',
			'Accept' : 'application/json'
		}};	

		$http.get('https://giphy.p.mashape.com/v1/gifs/translate?api_key=dc6zaTOxFJmzC&s=superman', config1)
			.success(function(data){
				$scope.giph = data;
			});

		$scope.example = {
			text: ''
		};
		$http.get('https://giphy.p.mashape.com/v1/gifs/translate?api_key=dc6zaTOxFJmzC&s=' + $scope.example.text, config1)
			.success(function(data1){
				$scope.giphy = data1;
			});

		 var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday"];
            $scope.day = dayNames[new Date().getDay()];		
		
		});
		




