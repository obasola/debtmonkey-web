'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('userRole.module'));
  
  describe('UserRoleCtrl', function(){
    var UserRoleCtrl, UserRole,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// UserRole service
    	UserRole = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'userRole1'});
    			return deferred.promise;
    		}
    	};
		
				UserRoleCtrl = $controller('UserRoleCtrl', {
    		'UserRole': UserRole,
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
    	expect($scope.userRole).toBeNull();
    	expect($scope.userRoles).toBe('userRole1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshUserRoleList', function() {
    	// given
    	UserRole.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'userRole2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshUserRoleList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.userRoles).toBe('userRole2');
    });
    
    it('refreshUserRole', function() {
    	// given
    	UserRole.get = function(userAccountId, roleRoleId) {
			var deferred = $q.defer();
			deferred.resolve({data:'userRole'+userAccountId+roleRoleId});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshUserRole('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.userRole).toBe('userRole'+'1'+'2');
    });
    
	it('goToUserRoleList', function() {
    	// given
    	spyOn($scope, "refreshUserRoleList");
    	
    	// when
    	$scope.goToUserRoleList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshUserRoleList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/userRole');
    });
    
    it('goToUserRole', function() {
    	// given
    	spyOn($scope, "refreshUserRole");
    	var userAccountId = 1;
    	var roleRoleId = 2;
    	
    	// when
    	$scope.goToUserRole(userAccountId, roleRoleId);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshUserRole).toHaveBeenCalledWith(userAccountId, roleRoleId);
    	expect($location.path).toHaveBeenCalledWith('/userRole'+'/'+userAccountId+'/'+roleRoleId);
    });
    
    it('save : create', function() {
    	// given
    	$scope.userRole = {userAccountId:'1', roleRoleId:'2', name:'userRole'};
    	
    	$scope.mode = 'create';
    	UserRole.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'userRoleSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.userRole).toBe('userRoleSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.userRole = {userAccountId:'1', roleRoleId:'2', name:'userRole'};
    	
    	$scope.mode = 'update';
    	UserRole.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'userRoleSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.userRole).toBe('userRoleSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	UserRole.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToUserRoleList");
    	
    	// when
    	$scope.delete('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToUserRoleList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : userRole create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/userRole/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.userRole).toBeNull();
    	expect($scope.userRoles).toBe('userRole1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});