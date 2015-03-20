'use strict';

app.factory('mainService', function($http){
    var repos = {};

    repos.getAllRepositories = function() {
        return $http.get('/core/topic/by_type/dmx.repository?include_childs=true')
            .then(getAllRepositoriesData)
            .catch(function(e){
                console.log('Error retrieving repositories',e);
                throw e;
            });
    };

    repos.getRepositoryCatalog = function() {
        return $http.get('/filerepo/dmx/repository-manager/catalog.json')
            .then(getCatalogData)
            .catch(function(e){
                console.log('Error retrieving catalog',e);
                throw e;
            });
    };

    function getCatalogData(response) {
        console.log('catalog in mainService', response);
        return response.data;
    }

    function getAllRepositoriesData(response) {
        console.log('local repos in mainService', response.data.items);
        return response.data.items;
    }

    repos.createRepository = function(repo) {
        return $http.post('/core/topic', {
          "type_uri": "dmx.repository",
          "childs": {
            "dmx.repository.name": repo.name,
            "dmx.repository.uri": repo.url,
            "dmx.repository.description": repo.description
          }
        });
    }

    repos.cloneRepository = function(repo) {
        return $http.get('/dmx/repository/'+ repo + '/clone') ;
    }

    repos.pullRepository = function(repo) {
        return $http.get('/dmx/repository/'+ repo + '/pull') ;
    }

    repos.deleteRepository = function(repoId) {
        return $http.delete('/core/topic/' + repoId)
    }
    
    return repos;
    
});
    
           
           

