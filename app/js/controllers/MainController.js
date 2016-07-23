'use strict'

app.controller('MainController', 
	function MainController($scope, $location){

        $scope.isLoginPage = function () {
            return $location.path() == '/login';
        };

        $scope.isMainOpened = function(){
            return $location.path() == '/';
        };


        $scope.isAboutOpened = function(){
            return $location.path() == '/about';
        };

        $scope.isManagePage = function() {
            var path = $location.path();
            return (path != '/' && path != '/login' && path != '/about');
        };

        $scope.isInManage = function() {
            var path = $location.path();
            return (path == '/addBoard' || path == '/deleteBoard' || path == '/updateBoard');
        }

});