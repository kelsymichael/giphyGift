var app = angular.module('uTemp', ['ngRoute', 'firebase']);


app 
	.service('chatMessages', function($firebaseArray){
		var ref = new Firebase('https://utemp.firebaseio.com');
		return $firebaseArray(ref);
	});


app
	.controller('fireCtrl', function($scope, chatMessages, apiService, apiWeather) {	
 	
		$scope.messages = chatMessages;
  	
  	$scope.addMessage = function(){
  		$scope.messages.$add({
  			content: $scope.message
  		});

  		$scope.message = '';
  	};

  	$scope.beers = null;
			apiService.getBeers().then(function(response){
			$scope.beers = response;
		});

		$scope.weatherInfo = apiWeather.getData().then(function(response){
			$scope.weatherInfo = response;
		});
	
	}); /// end of fireCtrl 


app 
	.service('apiService', function($http){
		this.getBeers = function(){
			return $http({
				method: 'GET',
				url: 'https://community-open-beer-database.p.mashape.com/beers.json',
				headers: {
					'X-Mashape-Key': 'Vt18ObzVHymshu7BgkVs9OW36RWnp1J9Z5EjsnaqZM34gYbp3a',
					'Accept': 'application/json'
				}
				});
			};	
 	});	

app 
	.service('apiWeather', function($http){
		this.getData = function(){
			return $http({
				method: 'GET',
				url: 'https://george-vustrey-weather.p.mashape.com/api.php?location=Los+Angeles',
				headers: {
					'X-Mashape-Key': 'Vt18ObzVHymshu7BgkVs9OW36RWnp1J9Z5EjsnaqZM34gYbp3a',
					'Accept': 'application/json'
				}
				});
		};	
 	});	




app 
	.config(function($routeProvider){
		$routeProvider
   
      .when('/', {
          templateUrl : 'pages/homeView.html',
          controller  : 'fireCtrl'
      })

      .when('/about', {
          templateUrl : 'pages/aboutView.html',
          controller  : 'mainCtrl'
      })

      .when('/blog', {
          templateUrl : 'pages/blogView.html',
          controller  : 'mainCtrl'
      })

      .otherwise({
				redirectTo: '/'
			});
	});

app 
	.controller('mainCtrl', ['$scope', function($scope){
		$scope.test = 'mainCtrl test';

	}]);

