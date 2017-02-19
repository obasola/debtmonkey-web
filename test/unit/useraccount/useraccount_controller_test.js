'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('userAccount.module'));
  
  describe('UserAccountCtrl', function(){
    var UserAccountCtrl, UserAccount,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// UserAccount service
    	UserAccount = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'userAccount1'});
    			return deferred.promise;
    		}
    	};
		
				UserAccountCtrl = $controller('UserAccountCtrl', {
    		'UserAccount': UserAccount,
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
    	expect($scope.userAccount).toBeNull();
    	expect($scope.userAccounts).toBe('userAccount1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshUserAccountList', function() {
    	// given
    	UserAccount.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'userAccount2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshUserAccountList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.userAccounts).toBe('userAccount2');
    });
    
    it('refreshUserAccount', function() {
    	// given
    	UserAccount.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'userAccount'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshUserAccount('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.userAccount).toBe('userAccount'+'1');
    });
    
	it('goToUserAccountList', function() {
    	// given
    	spyOn($scope, "refreshUserAccountList");
    	
    	// when
    	$scope.goToUserAccountList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshUserAccountList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/userAccount');
    });
    
    it('goToUserAccount', function() {
    	// given
    	spyOn($scope, "refreshUserAccount");
    	var id = 1;
    	
    	// when
    	$scope.goToUserAccount(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshUserAccount).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/userAccount'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.userAccount = {id:'1', name:'userAccount'};
    	
    	$scope.mode = 'create';
    	UserAccount.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'userAccountSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.userAccount).toBe('userAccountSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.userAccount = {id:'1', name:'userAccount'};
    	
    	$scope.mode = 'update';
    	UserAccount.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'userAccountSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.userAccount).toBe('userAccountSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	UserAccount.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToUserAccountList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToUserAccountList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : userAccount create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/userAccount/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.userAccount).toBeNull();
    	expect($scope.userAccounts).toBe('userAccount1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});