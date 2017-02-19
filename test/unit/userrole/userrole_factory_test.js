'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('userRole.module'));
  
  describe('UserRole', function(){
	var $httpBackend, UserRole, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	UserRole = $injector.get('UserRole');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/userRole').respond("test");
    	UserRole.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/userRole').respond("test");
    	UserRole.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/userRole/1/2').respond("test");
    	UserRole.get('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		UserRole.create({userAccountId:null, roleRoleId:null,name:'userRole'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('userRole.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/userRole').respond("test");
    	UserRole.create({userAccountId:'1', roleRoleId:'2',name:'userRole'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		UserRole.update({userAccountId:null, roleRoleId:null,name:'userRole'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('userRole.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/userRole/1/2').respond("test");
    	UserRole.update({userAccountId:'1', roleRoleId:'2',name:'userRole'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/userRole/1/2').respond("test");
    	UserRole.delete('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});