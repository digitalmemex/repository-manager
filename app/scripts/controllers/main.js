'use strict';

/**
 * @ngdoc function
 * @name cgcDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cgcDashboardApp
 */

app.controller('MainCtrl', function ($scope, mainService) {
    $scope.allRepos = {};
    mainService.getAllRepositories().then(function(response) {
        $scope.repositories = response.data.items;
        angular.forEach(response.data.items, function(repo) {
            $scope.allRepos[repo.value] = [];
            $scope.allRepos[repo.value]["name"] = repo.value;
            $scope.allRepos[repo.value]["description"] = repo.childs['dmx.repository.description'].value;
            $scope.allRepos[repo.value]["url"] = repo.childs['dmx.repository.uri'].value;
            if (angular.isUndefined(repo.childs['dmx.repository.status'])) {
                $scope.allRepos[repo.value]["status"] = "Install";
            } else {
                $scope.allRepos[repo.value]["status"] = "Update";
            }
        });
                        
    });

    $scope.selectAction = function(repo) {
        if (repo.status === "Install") {
            $scope.url = "/dmx/repository/"+ repo.name + "/clone" ;
        } else {
            $scope.url = "/dmx/repository/"+ repo.name + "/pull" ;
        }
    };
    
});
             