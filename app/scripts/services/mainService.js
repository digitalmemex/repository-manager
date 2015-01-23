app.service("mainService", function($http) {

    this.getAllRepositories = function(repos) {
        return $http.get("/core/topic/by_type/" + repos + "?include_childs=true")
    };
    
});
    
           
           

