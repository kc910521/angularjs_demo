'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('bottomCtrl', function($scope, $interval) {
    $scope.theTime = "w8ing";
    $scope.theTime = "stranger";
    $interval(function () {
        $scope.theTime = new Date().toLocaleTimeString();
    }, 1000);
})


;
