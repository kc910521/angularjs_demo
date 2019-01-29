'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.value("pageNumber", [])
.value("currPage", 1)
.value("name", "")



.factory('utils', function () {
    var factory = {};

    factory.takePgArr = function(itmCounts, currPg, pgSize) {
        if (pgSize == undefined) {
            pgSize = 5;
        }
        var max = (itmCounts > 1 ? itmCounts : 1)/pgSize > 1 ? (itmCounts > 1 ? itmCounts : 1) / pgSize : 1;
        max = max > parseInt(max) ? parseInt(max) + 1 : parseInt(max);
        var pgArr = [];
        for (var i = 1; i <= max; i ++) {
            if (i === currPg) {
                pgArr.push({"pg": i, "isCurr": true});
            } else {
                pgArr.push({"pg": i, "isCurr": false});
            }

        }
        return pgArr;
    }
    factory.filterNull = function (resVal) {
        if (resVal == undefined)
            return "";
        else
            return resVal;
    }
    return factory;
})

.service('toolService', function (utils) {
    this.takePgArr = function(itmCounts, currPg, pgSize) {
        return utils.takePgArr(itmCounts, currPg, pgSize);
    }

    this.filterNull = function (resVal) {
        return utils.filterNull(resVal);
    }
    // 4 mock
    this.mockData = function (type, pgNum, scpser, httpser) {
        if (pgNum == undefined) {
            pgNum = 1;
        }
        scpser.urlParam = "form=" + utils.filterNull(JSON.stringify(scpser.cd)) + "&pgNum=" + pgNum;

        httpser({
            url:"../data.json"
        }).then(function (data) {
            var res = null;
            if (type == 1) {
                res = data.data.list1;
            }else {
                res = data.data.list2;
            }
            console.log(res);
            scpser.names = res.slice((pgNum - 1) * scpser.pageSize );
            // 本身页码应该用另一个参数来判断
            scpser.pageNumber = utils.takePgArr(res.length, pgNum)
        })
    }
})

.controller('View1Ctrl', function($scope,$http,$location,$rootScope,toolService) {
    // locate path with username
    $scope.click3 = function() {
        $location.path("/view2/" + $scope.name)
    };
    $scope.nameChange = function () {
        console.log($scope.name);
        $rootScope.usrName = $scope.name;
    }
    // FETCH deault data
    toolService.mockData(1, 1, $scope, $http)
    // grid operation
    $scope.searchNow = function(pgNum){
        toolService.mockData(2, pgNum, $scope, $http)
    };

})

.directive("searchBox", function () {
    return {
        // scope: {
        //     childrenType: '@type',
        // },
        restrict: 'ACE',
        // scope :true ,
        controller: 'View1Ctrl',
        templateUrl: 'template/searchBox.html'
    };
})

;

