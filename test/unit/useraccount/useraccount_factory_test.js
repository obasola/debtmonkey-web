'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('userAccount.module'));
  
  describe('UserAccount', function(){
	var $httpBackend, UserAccount, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	UserAccount = $injector.get('UserAccount');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/userAccount').respond("test");
    	UserAccount.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/userAccount').respond("test");
    	UserAccount.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/userAccount/1').respond("test");
    	UserAccount.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		UserAccount.create({id:null,name:'userAccount'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('userAccount.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/userAccount').respond("test");
    	UserAccount.create({id:'1',name:'userAccount'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		UserAccount.update({id:null,name:'userAccount'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('userAccount.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/userAccount/1').respond("test");
    	UserAccount.update({id:'1',name:'userAccount'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/userAccount/1').respond("test");
    	UserAccount.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});