'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2/:uname', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl as v2ctrl'
    });

}])
.config(function ($provide) {
    $provide.provider('brewService', function() {
        this.$get = function() {
            var factory = {};

            factory.random = function(ceil) {
                return Math.floor((Math.random() * ceil) + 1);;
            }
            return factory;
        };
    });
})

.value('title1', 'Dependency Injection')
.value('resVal', 2)

.factory('tools', function () {
    var factory = {};

    factory.multiply = function(a, b) {
        return a * b
    }
    factory.sum = function(a, b) {
        return a + b
    }
    return factory;
})

.service('mathService', function (tools) {
    this.square = function(a) {
        return tools.multiply(a,a);
    }
})

.controller('View2Ctrl', function($scope,title1,resVal,mathService,brewService,$interval,$routeParams) {
    console.log($routeParams);
    if ($routeParams.uname == null || $routeParams.uname === '') {
        $routeParams.uname = 'stranger';
    }
    $scope.title1 = title1 + "," + $routeParams.uname;

    $interval(function () {
      if ($scope.res1 < 9999999) {
          $scope.res1 = mathService.square($scope.res1);
      }else {
          $scope.res1 = resVal ++;
      }
      $scope.res2 = brewService.random($scope.res1);
    }, 1000);
});