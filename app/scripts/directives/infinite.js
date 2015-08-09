'use strict';

/**
 * @ngdoc directive
 * @name bookaApp.directive:infinite
 * @description
 * # infinite
 */
 angular.module('bookaApp')
 .directive('infinite', function () {
 	return {
 		scope: {
 			change: '&',
 			limitTo: '='
 		},
 		template: '',
 		restrict: 'E',
 		controller: function($scope, $element, $window) {
 			var limit = $scope.limitTo;

 			angular.element($window).bind('scroll', function() {
 				var scroll = document.body.scrollTop;
 				var height = document.body.scrollHeight - $window.innerHeight;
 				var offset = $scope.limitTo;

 				if(scroll >= height) {
 					$scope.change({limit: limit + offset, apply: true});
 				}
 			});
 		}
 	};
 });
