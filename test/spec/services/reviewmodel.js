'use strict';

describe('Service: ReviewModel', function () {

  // load the service's module
  beforeEach(module('bookaApp'));

  // instantiate service
  var ReviewModel;
  var $httpBackend;
  var BASE_URL;
  beforeEach(inject(function (_BASE_URL_, $injector, _ReviewModel_) {
    BASE_URL = _BASE_URL_;
    ReviewModel = _ReviewModel_;
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', BASE_URL + 'reviews')
    .respond([{'foo': 'bar'}]);
  }));

  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
 });

  it('should get reviews', function () {
    $httpBackend.expectGET(BASE_URL + 'reviews');
    ReviewModel.all();
    $httpBackend.flush();
  });


});
