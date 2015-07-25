'use strict';

/**
 * @ngdoc function
 * @name bookaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookaApp
 */
angular.module('bookaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
