'use strict';

/**
 * @ngdoc overview
 * @name bookaApp
 * @description
 * # bookaApp
 *
 * Main module of the application.
 */
 angular
 .module('bookaApp', [
  'restangular',
  'ui.bootstrap',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
  ])
 .constant('BASE_URL', 'http://vngrs-challenge.herokuapp.com/api/')
 .config(function ($routeProvider, RestangularProvider, BASE_URL) {
  RestangularProvider.setBaseUrl(BASE_URL);
  RestangularProvider.setDefaultHeaders({'X-client_id': 'bd0d2debe4b53b9575d86ae782d54d02a0e2996de1eac4806e829dda4bf4ef53'});

  RestangularProvider.setResponseInterceptor(function(data, operation) {

    if(operation === 'getList') {
      return data.data;
    }
    // do your thing
    return data;
  });

  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: '_review',
    resolve: {
      'reviews': function($q, ReviewModel) {
        var defered = $q.defer();
        ReviewModel.all().then(function(response) {
          defered.resolve(response);
        });

        return defered.promise;
      }
    }
  })
  .otherwise({
    redirectTo: '/'
  });
});
