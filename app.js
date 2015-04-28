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
	.controller('mainCtrl', function($scope, $http, giphyService){
		$scope.date = new Date();
		var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	    $scope.day = dayNames[new Date().getDay()];		
		
		// $scope.giphyArr = [];
		$scope.giphyObj = [
		{
			pic: '',
			url: ''
		}];

		$scope.searchGiphy = function(uInput){
			$scope.urlInput = uInput;
			giphyService.getGiphy(uInput).then(function(response){
				// console.log(response);
				var ranNumber = Math.floor(Math.random() * (25 +1 ));
				
				$scope.giph = response[ranNumber].images.fixed_height.url;
				$scope.giphS = response[ranNumber].images.fixed_height_still.url;
				// console.log(response[ranNumber].images.fixed_height.url);
			//refresh giph
		




			// save-giph button //	
			$scope.saveGiphy = function(){
				$scope.giphyArr.push($scope.giphS);
				$scope.giphyObj.pic = $scope.giphS;
				$scope.giphyObj.url = $scope.giph;
				console.log($scope.giphyArr);
				console.log($scope.giphyObj.pic);
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


		




