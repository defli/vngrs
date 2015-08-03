'use strict';

/**
 * @ngdoc directive
 * @name bookaApp.directive:readMore
 * @description
 * # readMore
 */
 angular.module('bookaApp')
 .directive('readMore', function () {
 	return {
 		templateUrl: 'views/directives/read-more.html',
 		scope: {
 			'content': '=',
 			'limit': '@'
 		},

 		restrict: 'E',
 		link: function (scope) {
 			var shortContent = '';
 			if(scope.content.length > scope.limit) {
 				shortContent = scope.content.substring(0, scope.limit);
 				scope.shortContent = shortContent + '...';
 			}

 			scope.readMore = function() {
 				scope.shortContent = false;
 			};
 		}
 	};
 });
