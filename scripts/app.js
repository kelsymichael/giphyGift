var app = angular.module('giphyGift', [ 'ui.router', 'firebase']);

//config
app.constant('FBURL', 'https://giphygift.firebaseio.com');

app
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.when('', '/');
		$urlRouterProvider.otherwise('/login');
		$stateProvider
		 	.state('home', {
		 			url: '/',
          templateUrl : 'scripts/home/homeView.html',
          controller  : 'HomeCtrl'
      })
      .state('login', {
      		url: '/login',
          templateUrl : 'scripts/login-register/login-logout/login.html',
          controller  : 'LoginCtrl'
      })
      .state('logout', {
      url: '/logout',
      templateUrl: 'scripts/login-register/login-logout/logout.html',
      controller: 'LoginCtrl',
      resolve: {
        logout: function(authService){
          authService.logout();
        }
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'scripts/login-register/registration/register.html',
      controller: 'RegisterCtrl'
    })
    .state('secure', {
      abstract: true,
      template: '<div ui-view>',
      controller: 'SecureCtrl',
      resolve: {
        isLoggedIn: function(authService){
          return authService.isLoggedIn();
        }
      }
    })
    .state('secure.dashboard', {
      url: '/dashboard',
      templateUrl: 'scripts/secure/dashboard.html',
      controller: 'DashboardCtrl'
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
