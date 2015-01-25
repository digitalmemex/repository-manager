app.service("mainService", function($http) {

    this.getAllRepositories = function(repos) {
        return $http.get("/core/topic/by_type/dmx.repository?include_childs=true")
    };
    
});
    
           
           

