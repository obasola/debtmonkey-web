'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('paymentSchedule.module'));
  
  describe('PaymentScheduleCtrl', function(){
    var PaymentScheduleCtrl, PaymentSchedule, Account, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// PaymentSchedule service
    	PaymentSchedule = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'paymentSchedule1'});
    			return deferred.promise;
    		}
    	};
		
				Account = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				PaymentScheduleCtrl = $controller('PaymentScheduleCtrl', {
    		'PaymentSchedule': PaymentSchedule,
						'Account': Account,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.paymentSchedule).toBeNull();
    	expect($scope.paymentSchedules).toBe('paymentSchedule1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPaymentScheduleList', function() {
    	// given
    	PaymentSchedule.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentSchedule2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPaymentScheduleList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.paymentSchedules).toBe('paymentSchedule2');
    });
    
    it('refreshPaymentSchedule', function() {
    	// given
    	PaymentSchedule.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentSchedule'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPaymentSchedule('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.paymentSchedule).toBe('paymentSchedule'+'1');
    });
    
	it('goToPaymentScheduleList', function() {
    	// given
    	spyOn($scope, "refreshPaymentScheduleList");
    	
    	// when
    	$scope.goToPaymentScheduleList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPaymentScheduleList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/paymentSchedule');
    });
    
    it('goToPaymentSchedule', function() {
    	// given
    	spyOn($scope, "refreshPaymentSchedule");
    	var id = 1;
    	
    	// when
    	$scope.goToPaymentSchedule(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPaymentSchedule).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/paymentSchedule'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.paymentSchedule = {id:'1', name:'paymentSchedule'};
    	
    	$scope.mode = 'create';
    	PaymentSchedule.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentScheduleSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.paymentSchedule).toBe('paymentScheduleSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.paymentSchedule = {id:'1', name:'paymentSchedule'};
    	
    	$scope.mode = 'update';
    	PaymentSchedule.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentScheduleSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.paymentSchedule).toBe('paymentScheduleSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	PaymentSchedule.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPaymentScheduleList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPaymentScheduleList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : paymentSchedule create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/paymentSchedule/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.paymentSchedule).toBeNull();
    	expect($scope.paymentSchedules).toBe('paymentSchedule1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});