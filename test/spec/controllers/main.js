'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bookaApp'));

  var MainCtrl,
  scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    var reviews = [
    {
      user: {
        type: 'reader'
      },
      rating: 1
    }
    ];
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      reviews: reviews
    });
  }));


  it('should attach ribbons to the scope', function () {
    expect(MainCtrl.ribbons.length).toBe(6);
  });

  it('should attach orders to the scope', function () {
    expect(MainCtrl.orders.length).toBe(4);
  });

  it('should calculate ribbon elements', function () {
    MainCtrl.setRibbonCounts();
    expect(MainCtrl.ribbons[1].len).toBe(1);
  });

  it('should calculate stars', function () {
    MainCtrl.setStarCounts();
    expect(MainCtrl.stars[0].name).toBe(1);
    expect(MainCtrl.stars[0].percentage).toBe(100);

    expect(MainCtrl.stars[0].count).toBe(1);
  });

  it('should select first ribbon', function () {
    MainCtrl.setSelectedRibbon();
    expect(MainCtrl.selectedRibbon).toBe(MainCtrl.ribbons[0]);
  });

  it('should select second ribbon', function () {
    MainCtrl.setSelectedRibbon(MainCtrl.ribbons[1]);
    expect(MainCtrl.selectedRibbon).toBe(MainCtrl.ribbons[1]);
  });

  it('should set limit', function () {
    MainCtrl.setLimit(20);
    expect(MainCtrl.limitTo).toBe(20);
  });  

  it('should select first order', function () {
    MainCtrl.setOrder();
    expect(MainCtrl.orderBy).toBe(MainCtrl.orders[0]);
  });

  it('should select second order', function () {    
    MainCtrl.setOrder(MainCtrl.orders[1]);
    expect(MainCtrl.orderBy).toBe(MainCtrl.orders[1]);
  });
});
