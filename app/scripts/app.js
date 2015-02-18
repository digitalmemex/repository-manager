'use strict';

/**
 * @ngdoc overview
 * @name cgcDashboardApp
 * @description
 * # cgcDashboardApp
 *
 * Main module of the application.
 */
var app = angular
  .module('cgcDashboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui-notification'  
  ]);
app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/filerepo/dmx/repository-manager/app/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: '/filerepo/dmx/repository-manager/app/views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contribute', {
        templateUrl: '/filerepo/dmx/repository-manager/app/views/contribute.html',
        controller: 'ContributeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.config(function($httpProvider) {
        $httpProvider.interceptors.push(function ($q){
            console.log("httpProvider");
            return {
                request: function (config) {
                    console.log(config);
                    return config;
                },
                response: function (result) {
                    console.log("This is the response");
                    return result;
                },
                responseError: function (error) {
                    console.log("Failed with", error.status, "status");
                    return $q.reject(error);
                }
            }
            
        });
    });
