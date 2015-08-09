'use strict';

/**
 * @ngdoc service
 * @name bookaApp.ReviewModel
 * @description
 * # ReviewModel
 * Factory in the bookaApp.
 */
 angular.module('bookaApp')
 .factory('ReviewModel', function (Restangular) {
    // Service logic
    // ...


    // Public API here
    return {
    	all: function () {
    		return Restangular.all('reviews').getList();
    	},

    	vote: function(id, type) {
    		return Restangular.one('reviews', id).all('vote').post({type: type});
    	}
    };
});
