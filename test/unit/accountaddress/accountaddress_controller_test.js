'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('accountAddress.module'));
  
  describe('AccountAddressCtrl', function(){
    var AccountAddressCtrl, AccountAddress, Account,  AccountType, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// AccountAddress service
    	AccountAddress = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'accountAddress1'});
    			return deferred.promise;
    		}
    	};
		
				Account = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				AccountType = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				AccountAddressCtrl = $controller('AccountAddressCtrl', {
    		'AccountAddress': AccountAddress,
						'Account': Account,
						'AccountType': AccountType,
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
    	expect($scope.accountAddress).toBeNull();
    	expect($scope.accountAddresss).toBe('accountAddress1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshAccountAddressList', function() {
    	// given
    	AccountAddress.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountAddress2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAccountAddressList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.accountAddresss).toBe('accountAddress2');
    });
    
    it('refreshAccountAddress', function() {
    	// given
    	AccountAddress.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'accountAddress'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAccountAddress('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.accountAddress).toBe('accountAddress'+'1');
    });
    
	it('goToAccountAddressList', function() {
    	// given
    	spyOn($scope, "refreshAccountAddressList");
    	
    	// when
    	$scope.goToAccountAddressList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAccountAddressList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/accountAddress');
    });
    
    it('goToAccountAddress', function() {
    	// given
    	spyOn($scope, "refreshAccountAddress");
    	var id = 1;
    	
    	// when
    	$scope.goToAccountAddress(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAccountAddress).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/accountAddress'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.accountAddress = {id:'1', name:'accountAddress'};
    	
    	$scope.mode = 'create';
    	AccountAddress.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountAddressSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.accountAddress).toBe('accountAddressSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.accountAddress = {id:'1', name:'accountAddress'};
    	
    	$scope.mode = 'update';
    	AccountAddress.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountAddressSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.accountAddress).toBe('accountAddressSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	AccountAddress.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToAccountAddressList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToAccountAddressList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : accountAddress create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/accountAddress/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.accountAddress).toBeNull();
    	expect($scope.accountAddresss).toBe('accountAddress1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});