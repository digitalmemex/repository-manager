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

    function getAllRepositoriesData(response) {
        console.log('Data in mainService', response.data.items);
        return response.data.items;
    }

    repos.cloneRepository = function(repo) {
        return $http.get('/dmx/repository/'+ repo + '/clone') ;
    }

    repos.pullRepository = function(repo) {
        return $http.get('/dmx/repository/'+ repo + '/pull') ;
    }
    
    
    return repos;
    
});
    
           
           

