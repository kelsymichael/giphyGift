var app = angular.module('giphyGift');

app 
	.controller('MainCtrl', function($scope, $http, giphyService, $firebaseArray){
		$scope.date = new Date();
		var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	    $scope.day = dayNames[new Date().getDay()];		
		
		$scope.giphyArr = [];
		$scope.giphyArrUrl = [];
		$scope.giphyObj = [];

		$scope.searchGiphy = function(uInput){
			$scope.urlInput = uInput;
			giphyService.getGiphy(uInput).then(function(response){
				console.log(response);
				var ranNumber = Math.floor(Math.random() * (40 +1 ));
				
				$scope.giph = response[ranNumber].images.fixed_height.url;
				$scope.giphS = response[ranNumber].images.fixed_height_still.url;
		        
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
		}; /* end of searchGiphy */

		// $scope.saveGiphy = function(){
		// 	giphyArr.push($scope.searchGiphy(uInput));
		// 	console.log(giphyArr);
		// };

							// var ref = new Firebase("https://giphygift.firebaseio.com/savedGif");
							
							// $scope.savedGif = $firebaseArray(ref);

							// $scope.addGif = function(){
							// 	$scope.savedGif.$add({

							// 	})
							// }

							// 	$scope.data = $firebaseObject(ref);
							//  	syncObject.$bindTo($scope, "saveGiphy");

	}); /* end of controller */