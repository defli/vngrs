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
  var _this = this;

  _this.init = function() {
    _this.limitTo = 10;

    _this.reviews = reviews;
    _this.setRibbonCounts();
    _this.setOrder();
    _this.setSelectedRibbon();

    $rootScope.loaded = true;
  };

  _this.setRibbonCounts = function() {
    var counts = _.countBy(_this.reviews, 'user.type');
    counts.everyone = _this.reviews.length;

    _.forEach(counts, function(n, key) {

      var elm = _.find(_this.ribbons, {'slug': key}, this);
      elm.len = n;
    });
  };


  _this.setSelectedRibbon = function(ribbon) {
    if(typeof ribbon === 'undefined') {
      _this.selectedRibbon = _this.ribbons[0];
    } else {
      _this.selectedRibbon = ribbon;
    }
  };

  _this.setFilter = function(ribbon) {
    _this.setSelectedRibbon(ribbon);
    _this.setLimit(10);
    var slug = ribbon.slug;
    if(slug === 'everyone') {
      _this.filterBy  = {};
      return true;
    }

    _this.filterBy = {
      'user': 
      {'type': slug} 
    };

    return true;
  };

  _this.setLimit = function(limit) {
    _this.limitTo = limit;
  };

  _this.setOrder = function(obj) {
    if(typeof obj === 'undefined') {
      obj = _this.orders[0];
    }

    _this.orderBy = obj;
    return true;
  };

  _this.orders = [
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

  _this.ribbons = [
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


  _this.init();
});
