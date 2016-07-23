'use strict'

app.controller('AuthController',
	function AuthController($scope, $firebaseAuth,$location) {

		$scope.email = '';
		$scope.password = '';

		$scope.login = function(email, password, loginForm) {

			if(loginForm.$valid) {
				
				firebase.auth().signInWithEmailAndPassword(email, password)
				.then(function(firebaseUser){
					console.log("Signed in as:", firebaseUser.uid);
					$location.path('/manage').replace();
					$scope.$apply();
				})
				.catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  console.log(errorMessage);
				});
			}

		};

		$scope.signout = function() {
			firebase.auth().signOut().then(function() {
  				window.location = "/";
			}, function(error) {
  				console.log('Sign out failed', error);
			});
		};

		$scope.cancel = function() {
			 $location.path('/');
			 $scope.$apply();
		}
	});