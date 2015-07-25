'use strict';

/**
 * @ngdoc function
 * @name bookaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bookaApp
 */
angular.module('bookaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
