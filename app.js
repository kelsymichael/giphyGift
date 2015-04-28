var app = angular.module('uTemp', [ 'ngRoute', 'firebase']);

// app
	// 	.config(function($routeProvider) {
	// 		$routeProvider

	// 		 	.when('/', {
	//           templateUrl : 'pages/homeView.html',
	//           controller  : 'fireCtrl'
	//       })

	//       .when('/about', {
	//           templateUrl : 'pages/aboutView.html',
	//           controller  : 'mainCtrl'
	//       })

	//       .when('/blog', {
	//           templateUrl : 'pages/blogView.html',
	//           controller  : 'mainCtrl'
	//       })

	//       .otherwise({
	// 				redirectTo: '/'
	// 			});
	// 	});

app 
	.controller('mainCtrl', function($scope, $http, apiWeather){
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
		

		$scope.getWeather = function(){
			apiWeather.getData().then(function(results){
				$scope.weatherHigh = results;
			});

		};

		 var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday"];
            $scope.day = dayNames[new Date().getDay()];		
		});

app 
	.service('apiWeather', function($http, $q){
		this.getData = function(){
			var deferred = $q.defer();	
				$http({
				method: 'GET',
				url: 'https://george-vustrey-weather.p.mashape.com/api.php?location=Los+Angeles',
				headers: {
					'X-Mashape-Key': 'Vt18ObzVHymshu7BgkVs9OW36RWnp1J9Z5EjsnaqZM34gYbp3a',
					'Accept': 'application/json'
				}
				}).then(function(data){
					var results = data;
					console.log(results);
					deffered.resolve(results);
				});
				return deferred.promise;
		};	
 	});	


app 
	.service('apiCats', function($http){
		this.getCats = function(){
			 $http({
				method: 'GET',
				url: 'https://montanaflynn-cat-overflow.p.mashape.com/?limit=10&offset=1',
				headers: {
					'X-Mashape-Key': 'Vt18ObzVHymshu7BgkVs9OW36RWnp1J9Z5EjsnaqZM34gYbp3a',
					'Accept': 'text/plain'
				}
				});
		};	
 	});	


