'use strict';

/**
 * @ngdoc function
 * @name repository-manager.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the repository-manager
 */

app.controller('MainCtrl', function ($scope, $location,  mainService, Notification) {
    $scope.allRepos = {};
    function getAllRepositories() {
        mainService.getAllRepositories()
            .then(function(response) {
                var repositories = response;
                getRepoInfo(repositories)
                mainService.getRepositoryCatalog()
                    .then(function (catalog) {
                        addCatalogInfo(catalog);
                    })
            });
    };

    getAllRepositories();

    function addCatalogInfo(catalog) {
        // merge local repositories and catalog
        angular.forEach(catalog, function (repo, name) {
          if ($scope.allRepos[name] === undefined) {
//            console.log('add repo from catalog');
            $scope.allRepos[name] = [];
            $scope.allRepos[name]["name"] = name;
            $scope.allRepos[name]["description"] = repo.description;
            $scope.allRepos[name]["url"] = repo.url;
            $scope.allRepos[name]["status"] = "new";
          }
        })
    }

    function getRepoInfo(repositories) {
        angular.forEach(repositories, function(repo) {
            $scope.allRepos[repo.value] = [];
            $scope.allRepos[repo.value]["id"] = repo.id;
            $scope.allRepos[repo.value]["name"] = repo.value;
            $scope.allRepos[repo.value]["description"] = repo.childs['dmx.repository.description'].value;
            $scope.allRepos[repo.value]["url"] = repo.childs['dmx.repository.uri'].value;
            if (angular.isUndefined(repo.childs['dmx.repository.status'])
              || repo.childs['dmx.repository.status'].uri === 'dmx.repository.status.configured') {
                $scope.allRepos[repo.value]["status"] = "configured";
            } else {
                $scope.allRepos[repo.value]["status"] = "installed";
            };
        });
//        console.log("all repos", $scope.allRepos)
    };
   
   
    $scope.selectAction = function(repo) {
        if (repo.status === "new") {
            repo.processing = true;
            repo.message = 'configure new repo ...';
            mainService.createRepository(repo)
              .then(function(response) {
                repo.id = response.data.id;
                repo.status = 'configured';
                repo.message = 'installing new repo ...';
                mainService.cloneRepository(repo.name)
                  .then(function(response) {
                    repo.processing = false;
                    repo.status = 'installed';
                    Notification.success({message: 'App installed', delay: 1000});
                  });
              });
        } else if (repo.status === "configured") {
            repo.processing = true;
            repo.message = 'installing new repo ...';
            mainService.cloneRepository(repo.name)
              .then(function(response) {
                repo.processing = false;
                repo.status = 'installed';
                Notification.success({message: 'App installed', delay: 1000});
            });
        } else { // installed
            repo.processing = true;
            repo.message = 'updating repo ...';
            mainService.pullRepository(repo.name)
                .then(function(response) {
                    repo.processing = false;
                    Notification.info({message: 'App updated', delay: 1000});
                });
//            console.log("Updated");
        };

    };

    $scope.deleteRepo = function(repo) {
        repo.processing = true;
        repo.message = 'deleting repo ...';
        mainService.deleteRepository(repo.id)
                .then(function(response) {
                    repo.processing = false;
                    repo.status = "new";
                    Notification.info({message: 'App deleted', delay: 1000});
                });
            console.log("Deleted");
    };

    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.url());
        console.log('location path', $location.url())
        return active;
    };
 
});
             