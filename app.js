var app = angular.module('giphyGift', [ 'ngRoute', 'firebase']);

//config
app
	.config(function($routeProvider) {
		$routeProvider
		 	.when('/', {
          templateUrl : 'pages/homeView.html',
          controller  : 'MainCtrl'
      })
      .when('/login', {
          templateUrl : 'pages/loginView.html',
          controller  : 'MainCtrl'
      })
      .otherwise({
				redirectTo: 'giphygift/#/'
			});
	});

app
	.service('giphyService', function($http, $q){
		/* header */
		var config1 = {headers: {
			'X-Mashape-Key' : 'Vt18ObzVHymshu7BgkVs9OW36RWnp1J9Z5EjsnaqZM34gYbp3a',
			'Accept' : 'application/json',
		}};	

		this.getGiphy = function(uInput){
			var deferred = $q.defer();
			$http.get('https://giphy.p.mashape.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + uInput, config1)
				.then(function(response){
					deferred.resolve(response.data.data);
				},
				function(data){
					alert('no image found, try again');
				});

				return deferred.promise;
			// .success(function(data){
		};
	}); /* end of service */

// app.factory('Auth', function(FURL, $firebaseAuth, $firebase){
// 		var ref = new Firebase("https://giphygift.firebaseio.com");
// 			ref.authWithOAuthPopup("google", function(error, authData) {
// 			  if (error) {
// 			    console.log("Login Failed!", error);
// 			  } else {
// 			    console.log("Authenticated successfully with payload:", authData);
// 			  }
// 	});
// })
