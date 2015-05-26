var app = angular.module('giphyGift', [ 'ngRoute', 'firebase', 'ngClipboard']);

//config
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
				redirectTo: 'giphygift/#/'
			});
	});

//controller 
app 
	.controller('mainCtrl', function($scope, $http, giphyService){
		$scope.date = new Date();
		var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	    $scope.day = dayNames[new Date().getDay()];		
		
		$scope.giphyArr = [];
		$scope.giphyArrUrl = [];
		$scope.giphyObj = [];

		$scope.searchGiphy = function(uInput){
			$scope.urlInput = uInput;
			giphyService.getGiphy(uInput).then(function(response){
				// console.log(response);
				var ranNumber = Math.floor(Math.random() * (40 +1 ));
				
				$scope.giph = response[ranNumber].images.fixed_height.url;
				$scope.giphS = response[ranNumber].images.fixed_height_still.url;
				// console.log(response[ranNumber].images.fixed_height.url);
			//refresh giph
		        
			// save-giph button //	
			$scope.saveGiphy = function(){
				$scope.giphyArr.push($scope.giphS);
				$scope.giphyArrUrl.push($scope.giph);

				$scope.giphyObj.pic = $scope.giphS;
				$scope.giphyObj.url = $scope.giph;

				var giphyObjSend = {
					pic: $scope.giphS,
					url: $scope.giph
				};

				$scope.giphyObj.push(giphyObjSend);
				// console.log($scope.giphyArr);
				console.log($scope.giphyObj);
			};
		});



			// ranNumber = '';
			// // console.log(uInput);
			// $scope.uInput = '';
			// // console.log($scope.urlInput);
			// $scope.giphyObj = ''
		};

		// $scope.saveGiphy = function(){
		// 	giphyArr.push($scope.searchGiphy(uInput));
		// 	console.log(giphyArr);
		// };
	}); /* end of controller */

// app.controller('Auth', function($scope, Auth){
// 	$scope.loginGoogle = function(){
// 		ref.authWithOAuthPopup();
// });


app
	.service('giphyService', function($http, $q){
		
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







app.factory('Auth', function(FURL, $firebaseAuth, $firebase){
		var ref = new Firebase("https://giphygift.firebaseio.com");
			ref.authWithOAuthPopup("google", function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			  }
	});
})



 //cliboardAttempt -- not working -- app
		 // 	.config(['ngClipProvider', function(ngClipProvider) {
		 //    ngClipProvider.setPath("//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf");
		 //  }]);

			// app
			// 	.controller('myctrl', function ($scope) {
		 //    $scope.fallback = function(copy) {
		 //      window.prompt('Press cmd+c to copy the text below.', copy);
		 //    };

		 //    $scope.showMessage = function() {
		 //      alert("giph");
		 //    };
		 //  });

		




