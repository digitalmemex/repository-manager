'use strict';

/**
 * @ngdoc function
 * @name repository-manager.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the repository-manager
 */

app.controller('MainCtrl', function ($scope, mainService, Notification) {
 
    $scope.allRepos = {};
    function getAllRepositories() {
        return mainService.getAllRepositories() 
            .then(function(response) {
                var repositories = response;
                return getRepoInfo(repositories);
            });
    };

    getAllRepositories();

    function getRepoInfo(repositories) {
        angular.forEach(repositories, function(repo) {
            $scope.allRepos[repo.value] = [];
            $scope.allRepos[repo.value]["name"] = repo.value;
            $scope.allRepos[repo.value]["description"] = repo.childs['dmx.repository.description'].value;
            $scope.allRepos[repo.value]["url"] = repo.childs['dmx.repository.uri'].value;
            if (angular.isUndefined(repo.childs['dmx.repository.status'])
              || repo.childs['dmx.repository.status'].uri === 'dmx.repository.status.configured') {
                $scope.allRepos[repo.value]["status"] = "Install";
            } else {
                $scope.allRepos[repo.value]["status"] = "Update";
            };
        });
        console.log("all repos", $scope.allRepos)
    };
   
   
    $scope.selectAction = function(repo) {
        if (repo.status === "Install") {
            $scope.url = "/dmx/repository/"+ repo.name + "/clone" ;
            mainService.cloneRepository(repo.name)
                .then(function(response) {
                    Notification.success({message: 'App installed', delay: 1000});
                });

            console.log("Created");
        } else {
            $scope.url = "/dmx/repository/"+ repo.name + "/pull" ;
            mainService.pullRepository(repo.name)
                .then(function(response) {
                    Notification.info({message: 'App updated', delay: 1000});
                });
            console.log("Updated");
        }
    };
  
});
             