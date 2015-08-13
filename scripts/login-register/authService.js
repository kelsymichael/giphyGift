var app = angular.module('giphyGift');

app.service('authService', function($firebase, FBURL, $firebaseAuth, $firebaseObject, $state, $rootScope){
  var ref = new Firebase(FBURL);
	var auth = $firebaseAuth(ref);
	
  this.cachedUser = ref.getAuth();

  var addNewUserToFB = function(newUser){
    ref.child('user').child(newUser.uid).set(newUser);
  };

  this.isLoggedIn = function(){
    return !!ref.getAuth();
  };

  this.getUser = function(){
    return this.cachedUser || ref.getAuth();
  };

/*
  this.createUser = function(user, cb) {
    ref.createUser(user, function(err) {
      if (err) {
        switch (err.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", err);
        }
      } else {
          this.loginWithPW(user, function(authData){
            addNewUserToFB({
              email: user.email,
              uid: authData.uid,
              token: authData.token
            });
          }, cb);
      }
    }.bind(this));
  };
*/
	
		this.register = function(user) {
			console.log('this.register Hit!')
		return auth.$createUser({
			email: user.email,
			password: user.pw
		}).then(function(regUser) {
			console.log(regUser)
			//regUser.uid.replace('simplelogin', ''); //TRYING TO REMOVE SIMPLELOGIN NOT WORKING
			var userRef = new Firebase(FBURL + '/users/' + regUser.uid);
			var firebaseUsers = $firebaseObject(userRef);

//			DONT DO THIS, WILL NOT WORK WITH FIREBASEOBJECT -- INSTEAD HARD ASSIGN TO OBJECT PARAMS AND .$save() -- SEE BELOW
//			var userInfo = {
//				date:  Firebase.ServerValue.TIMESTAMP,
//				regUser: regUser.uid,
//				firstname: user.firstname,
//				lastname: user.lastname,
//				email: user.email,
//			}; // user info
//			
			firebaseUsers.date = Firebase.ServerValue.TIMESTAMP;
			firebaseUsers.regUser = regUser.uid;
			firebaseUsers.firstname = user.firstName,
			firebaseUsers.lastname = user.lastName,
			firebaseUsers.email = user.email,
			firebaseUsers.keepers = {},
			
			firebaseUsers.$save();

		});// 'and then' promise

	}// register user with firebase service

		this.login = function(user){
			console.log('this.loginHit');
		return auth.$authWithPassword({
				email: user.email,
				password: user.pw
			});
		}; // LOG IN FUNCTION, GETS PASSED USER INFO THROUGH CTRL
	
	
  /*this.loginWithPW = function(userObj, cb, cbOnRegister){
    ref.authWithPassword(userObj, function(err, authData){
      if(err){
        console.log('Error on login:', err.message);
        cbOnRegister && cbOnRegister(false);
      } else {
        authData.email = userObj.email;
        this.cachedUser = authData;
        cb(authData);
        cbOnRegister && cbOnRegister(true);
      }
    }.bind(this));
  };
*/
/*  this.loginWithAuthPopup = function(service, cb){
    ref.authWithOAuthPopup(service, function(err, authData){
      if(err){
        console.log('Error on login: ', err.message);
      } else {
        addNewUserToFB(authData);
        this.cachedUser = authData;
        cb(authData);
      }
    }.bind(this))
  };*/
	
	auth.$onAuth(function(authUser) {
		//if onAuth returns something (authUser) then someone must be logging in
		if (authUser) {
			console.log(authUser)
			var onRef = new Firebase(FBURL + '/users/' + authUser.uid);
			var userData = $firebaseObject(onRef);
			userData.$loaded().then(function(fullUser) {
					$rootScope.currentUser = fullUser;
					console.log("Logged in as: ", fullUser);
					console.log($rootScope.currentUser);
					console.log(authUser.uid)
			})
		// if onAuth DOES NOT return something, someone is logging out -- reset $rootScope.currentUser to ''.
		} else {
			$rootScope.currentUser = '';
			console.log($rootScope.currentUser + "from $onAuth in service")
		}
	})//onAuth

 this.logout = function() {
//	 	this.cachedUser = null
		return auth.$unauth();
	};
 
});