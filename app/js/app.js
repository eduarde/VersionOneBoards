'use strict'

var app = angular.module('versionOne', ['firebase','ngRoute'])


    .config(function($sceProvider, $routeProvider) {
 
      	$sceProvider.enabled(false);

      	$routeProvider

          	// route for the home page
            .when('/', {
            	templateUrl : 'pages/boards.html',
                controller  : 'BoardController'
                })

            // route for the about page
            .when('/about', {
                    templateUrl : 'pages/about.html',
                    controller  : 'AboutController'
                })

            // route for the login page
            .when('/login', {
                    templateUrl : 'pages/login.html',
                    controller  : 'AuthController'
                })

            // route for the manage boards page
            .when('/manage', {
                templateUrl : 'pages/manage.html',
                controller  : 'ManageBoardController',
                loginRequired: true
             
            })

            // route for the adding boards page
            .when('/addBoard', {
                templateUrl : 'pages/addBoard.html',
                controller  : 'ManageBoardController',
                loginRequired: true
            })

            // route for the delete boards page
            .when('/deleteBoard', {
                templateUrl : 'pages/deleteBoard.html',
                controller  : 'ManageBoardController',
                loginRequired: true
            })

            // route for the delete boards page
            .when('/updateBoard', {
                templateUrl : 'pages/updateBoard.html',
                controller  : 'ManageBoardController',
                loginRequired: true
            })

             // route for the delete boards page
            .when('/doUpdate', {
                templateUrl : 'pages/doUpdate.html',
                controller  : 'ManageBoardController',
                loginRequired: true
            });


    })


    .run(function ($location, $rootScope, $firebaseAuth) {

        var postLogInRoute;

        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

        var loggedIn =  firebase.auth().currentUser;

        //if login required and you're logged out, capture the current path

        if (nextRoute.loginRequired && loggedIn == null) {
            postLogInRoute = $location.path();
          $location.path('/login').replace();
        } else if (postLogInRoute && loggedIn) {
        //once logged in, redirect to the last route and reset it
          $location.path(postLogInRoute).replace();
          postLogInRoute = null;
        }
    });
});

