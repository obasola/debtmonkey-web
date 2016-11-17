'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('accountAddress.module'));
  
  describe('AccountAddress', function(){
	var $httpBackend, AccountAddress, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	AccountAddress = $injector.get('AccountAddress');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/accountAddress').respond("test");
    	AccountAddress.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/accountAddress').respond("test");
    	AccountAddress.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/accountAddress/1').respond("test");
    	AccountAddress.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		AccountAddress.create({id:null,name:'accountAddress'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('accountAddress.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/accountAddress').respond("test");
    	AccountAddress.create({id:'1',name:'accountAddress'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		AccountAddress.update({id:null,name:'accountAddress'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('accountAddress.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/accountAddress/1').respond("test");
    	AccountAddress.update({id:'1',name:'accountAddress'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/accountAddress/1').respond("test");
    	AccountAddress.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});