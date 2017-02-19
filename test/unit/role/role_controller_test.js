'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('role.module'));
  
  describe('RoleCtrl', function(){
    var RoleCtrl, Role, UserAccount, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Role service
    	Role = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'role1'});
    			return deferred.promise;
    		}
    	};
		
				UserAccount = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				RoleCtrl = $controller('RoleCtrl', {
    		'Role': Role,
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
    	expect($scope.role).toBeNull();
    	expect($scope.roles).toBe('role1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshRoleList', function() {
    	// given
    	Role.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'role2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshRoleList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.roles).toBe('role2');
    });
    
    it('refreshRole', function() {
    	// given
    	Role.get = function(roleId) {
			var deferred = $q.defer();
			deferred.resolve({data:'role'+roleId});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshRole('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.role).toBe('role'+'1');
    });
    
	it('goToRoleList', function() {
    	// given
    	spyOn($scope, "refreshRoleList");
    	
    	// when
    	$scope.goToRoleList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshRoleList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/role');
    });
    
    it('goToRole', function() {
    	// given
    	spyOn($scope, "refreshRole");
    	var roleId = 1;
    	
    	// when
    	$scope.goToRole(roleId);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshRole).toHaveBeenCalledWith(roleId);
    	expect($location.path).toHaveBeenCalledWith('/role'+'/'+roleId);
    });
    
    it('save : create', function() {
    	// given
    	$scope.role = {roleId:'1', name:'role'};
    	
    	$scope.mode = 'create';
    	Role.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'roleSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.role).toBe('roleSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.role = {roleId:'1', name:'role'};
    	
    	$scope.mode = 'update';
    	Role.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'roleSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.role).toBe('roleSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Role.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToRoleList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToRoleList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : role create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/role/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.role).toBeNull();
    	expect($scope.roles).toBe('role1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});