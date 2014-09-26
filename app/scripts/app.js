'use strict';

/**
 * @ngdoc overview
 * @name potatoApp
 * @description
 * # potatoApp
 *
 * Main module of the application.
 */

angular
  .module('potatoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/photos', {templateUrl: 'views/photo-list.html', controller: 'PhotoListCtrl'})
      .when('/photos/:id', {templateUrl: 'views/photo-detail.html', controller: 'PhotoDetailCtrl'})
      .otherwise({redirectTo: '/photos'}); 
  }).config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
