'use strict';

/**
 * @ngdoc function
 * @name cgcDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cgcDashboardApp
 */

app.controller('MainCtrl', function ($scope, mainService) {

    mainService.getAllRepositories("dmx.repository", true, true).then(function(response) {
          $scope.repositories = response.data.items;
          console.log("Repositories ", response.data)
      });
      
});
             