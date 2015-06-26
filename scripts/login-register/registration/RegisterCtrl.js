var app = angular.module('giphyGift');

app.controller('RegisterCtrl', function($scope, $state, authService){
/*  $scope.user = {};
  $scope.register = function(){
    var userObj = {
      email: $scope.user.email,
      password: $scope.user.pw
    };
	*/
	$scope.register = function(){
		$state.go('secure.dashboard');
		authService.register($scope.user)
		.then(function(user){
			authService.login($scope.user);
		}).then(function(res) {
			authService.isLoggedIn();
		})
			.catch(function(error){
			$scope.message = error.message;
		})
		$state.go('secure.dashboard');

	}


  /*  authService.register(userObj, function(result){
      if(result){
        $state.go('secure.dashboard');
      }
    });
		*/
/*		$scope.user.email = '';
    $scope.user.pw = '';
 */
});

/*
			firstName: $scope.user.firstName,
			lastName: $scope.user.lastName,*/