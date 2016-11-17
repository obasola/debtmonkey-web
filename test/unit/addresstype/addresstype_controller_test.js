'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('addressType.module'));
  
  describe('AddressTypeCtrl', function(){
    var AddressTypeCtrl, AddressType,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// AddressType service
    	AddressType = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'addressType1'});
    			return deferred.promise;
    		}
    	};
		
				AddressTypeCtrl = $controller('AddressTypeCtrl', {
    		'AddressType': AddressType,
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
    	expect($scope.addressType).toBeNull();
    	expect($scope.addressTypes).toBe('addressType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshAddressTypeList', function() {
    	// given
    	AddressType.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'addressType2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAddressTypeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.addressTypes).toBe('addressType2');
    });
    
    it('refreshAddressType', function() {
    	// given
    	AddressType.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'addressType'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAddressType('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.addressType).toBe('addressType'+'1');
    });
    
	it('goToAddressTypeList', function() {
    	// given
    	spyOn($scope, "refreshAddressTypeList");
    	
    	// when
    	$scope.goToAddressTypeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAddressTypeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/addressType');
    });
    
    it('goToAddressType', function() {
    	// given
    	spyOn($scope, "refreshAddressType");
    	var id = 1;
    	
    	// when
    	$scope.goToAddressType(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAddressType).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/addressType'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.addressType = {id:'1', name:'addressType'};
    	
    	$scope.mode = 'create';
    	AddressType.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'addressTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.addressType).toBe('addressTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.addressType = {id:'1', name:'addressType'};
    	
    	$scope.mode = 'update';
    	AddressType.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'addressTypeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.addressType).toBe('addressTypeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	AddressType.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToAddressTypeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToAddressTypeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : addressType create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/addressType/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.addressType).toBeNull();
    	expect($scope.addressTypes).toBe('addressType1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});