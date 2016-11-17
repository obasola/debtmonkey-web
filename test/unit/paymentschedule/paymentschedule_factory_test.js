'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('paymentSchedule.module'));
  
  describe('PaymentSchedule', function(){
	var $httpBackend, PaymentSchedule, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	PaymentSchedule = $injector.get('PaymentSchedule');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/paymentSchedule').respond("test");
    	PaymentSchedule.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/paymentSchedule').respond("test");
    	PaymentSchedule.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/paymentSchedule/1').respond("test");
    	PaymentSchedule.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		PaymentSchedule.create({id:null,name:'paymentSchedule'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('paymentSchedule.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/paymentSchedule').respond("test");
    	PaymentSchedule.create({id:'1',name:'paymentSchedule'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		PaymentSchedule.update({id:null,name:'paymentSchedule'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('paymentSchedule.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/paymentSchedule/1').respond("test");
    	PaymentSchedule.update({id:'1',name:'paymentSchedule'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/paymentSchedule/1').respond("test");
    	PaymentSchedule.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});