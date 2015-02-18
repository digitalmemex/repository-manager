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
            if (angular.isUndefined(repo.childs['dmx.repository.status'])) {
                $scope.allRepos[repo.value]["status"] = "Install";
            } else {
                $scope.allRepos[repo.value]["status"] = "Update";
            };
        });
    };
   
   
    $scope.selectAction = function(repo) {
        if (repo.status === "Install") {
            $scope.url = "/dmx/repository/"+ repo.name + "/clone" ;
            Notification.success('Repository app created');
            console.log("Created");
        } else {
            $scope.url = "/dmx/repository/"+ repo.name + "/pull" ;
            console.log("Updated");
            Notification.info('Repository app updated');
        }
    };
  
});
             