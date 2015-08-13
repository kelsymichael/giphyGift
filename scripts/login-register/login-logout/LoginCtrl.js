var app = angular.module('giphyGift');

app.controller('LoginCtrl', function($scope, $state, authService){
/*  $scope.user = {};
  $scope.login = function(){
    var userObj = {
      email: $scope.user.email,
      password: $scope.user.pw
    };
		
		

    $scope.user.email = '';
    $scope.user.pw = '';

    authService.loginWithPW(userObj, function(){
      $state.go('secure.dashboard');
    });
  };*/
	$scope.login = function() {
		authService.login($scope.user)
			.then(function(res) {
			authService.isLoggedIn();
		})
			.catch(function(error){
			$scope.message = error.message;
		})
		$state.go('secure.dashboard');
	}
});

	