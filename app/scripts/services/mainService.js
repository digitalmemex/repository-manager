app.factory("mainService", function($http,$location,$exceptionHandler,$log){
    var repos = {}

    repos.getAllRepositories = function() {
        return $http.get("/core/topic/by_type/dmx.repository?include_childs=true")
            .then(getAllRepositoriesData)
            .catch(function(e){
                console.log("Error retrieving repositories",e);
                throw e; 
            });
    }
    function getAllRepositoriesData(response) {
        console.log("Data in mainService", response.data.items);
        return response.data.items;
    };
    
    return repos
    
});
    
           
           

