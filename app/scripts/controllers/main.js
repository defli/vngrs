'use strict';

/**
 * @ngdoc function
 * @name bookaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookaApp
 */
 angular.module('bookaApp')
 .controller('MainCtrl', function (reviews, $rootScope) {
  var vm = this; // vm: virtual model

  vm.init = function() {
    vm.limitTo = 10;
    vm.stars = [];
    vm.reviews = reviews;
    vm.total = reviews.length;
    vm.setRibbonCounts();
    vm.setStarCounts();
    vm.setOrder();
    vm.setSelectedRibbon();

    $rootScope.loaded = true;
  };

  vm.setRibbonCounts = function() {
    var counts = _.countBy(vm.reviews, 'user.type');
    counts.everyone = vm.reviews.length;

    _.forEach(counts, function(n, key) {

      var elm = _.find(vm.ribbons, {'slug': key}, this);
      elm.len = n;
    });
  };


  vm.setStarCounts = function() {
    var counts = _.countBy(vm.reviews, 'rating');
    var sumWithStar = 0;
    var sum = 0;
    _.forEach(counts, function(n, key) {
      vm.stars.push({
        'name': parseInt(key),
        'count': n,
        'percentage': parseInt((n / vm.total) * 100)
      });
      sum += n;
      sumWithStar += key * n;
    });

    vm.average = Math.round(sumWithStar / sum);
  };

  vm.setSelectedRibbon = function(ribbon) {
    if(typeof ribbon === 'undefined') {
      vm.selectedRibbon = vm.ribbons[0];
    } else {
      vm.selectedRibbon = ribbon;
    }
  };

  vm.setFilter = function(ribbon) {
    vm.setSelectedRibbon(ribbon);
    vm.setLimit(10);
    var slug = ribbon.slug;
    if(slug === 'everyone') {
      vm.filterBy  = {};
      return true;
    }

    vm.filterBy = {
      'user': 
      {'type': slug} 
    };

    return true;
  };

  vm.setLimit = function(limit) {
    vm.limitTo = limit;
  };

  vm.setOrder = function(obj) {
    if(typeof obj === 'undefined') {
      obj = vm.orders[0];
    }

    vm.orderBy = obj;
    return true;
  };

  vm.orders = [
  {
    'slug' : 'helpful_count',
    'name': 'Most Helpful'
  },
  {
    'slug' : 'not_helpful_count',
    'name': 'Most Not Helpful'
  },
  {
    'slug' : 'rating',
    'name': 'Highest Rating'
  },  
  {
    'slug' : '-id',
    'name': 'Newest First'
  }
  ];

  vm.ribbons = [
  {
    'title': 'Everyone',
    'slug': 'everyone',
    'len': 0,
    'color': 'dark-green'
  },
  {
    'title': 'Readers',
    'slug': 'reader',
    'len': 0,
    'color': 'light-blue'
  },
  {
    'title': 'Critics',
    'len': 0,
    'slug': 'critic',
    'color': 'light-yellow'
  },    
  {
    'title': 'Editors',
    'slug': 'editor',
    'len': 0,
    'color': 'light-red'
  },  
  {
    'title': 'Librarians',
    'slug': 'librarian',
    'len': 0,
    'color': 'light-green'
  },  
  {
    'title': 'Bloggers',
    'slug': 'blogger',

    'len': 0,
    'color': 'light-purple'
  },  
  ];


  vm.init();
});
