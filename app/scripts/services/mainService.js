app.service("mainService", function($http) {

    this.getAllRepositories = function(repos) {
        return $http.get("/core/topic/by_type/" + repos + "?fetch_composite=true")
    };
    
});
    
           
           

