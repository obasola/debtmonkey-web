'use strict';

/**
 * Factory for PaymentSchedule
 */
paymentScheduleModule.factory('PaymentSchedule', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage paymentSchedule
    var entityURL = restURL + '/paymentSchedule';
	
	/**
     * Validate paymentSchedule
     * @param paymentSchedule paymentSchedule
     * @throws validation exception
     */
	var validate = function (paymentSchedule) {
		var errors = [];
        if( paymentSchedule.id == null || paymentSchedule.id == '' ) {
			errors.push('paymentSchedule.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all paymentSchedules as list items
         * @return all paymentSchedules as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/paymentSchedule');
    	},

        /**
         * Get all paymentSchedules
         * @return all paymentSchedules
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get paymentSchedule
         * @param id id
         * @return paymentSchedule
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new paymentSchedule
         * @param paymentSchedule paymentSchedule
         * @return paymentSchedule saved
         */
		create: function(paymentSchedule) {
			validate(paymentSchedule)
			var url = entityURL;
			return $http.post(url, paymentSchedule);
    	},

        /**
         * Update paymentSchedule
         * @param paymentSchedule paymentSchedule
         * @return paymentSchedule saved
         */
    	update: function(paymentSchedule) {
			validate(paymentSchedule)
			var url = entityURL + '/' + paymentSchedule.id;
			return $http.put(url, paymentSchedule);
    	},

		/**
         * Delete paymentSchedule
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

