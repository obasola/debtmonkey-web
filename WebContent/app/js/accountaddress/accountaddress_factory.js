'use strict';

/**
 * Factory for AccountAddress
 */
accountAddressModule.factory('AccountAddress', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage accountAddress
    var entityURL = restURL + '/accountAddress';
	
	/**
     * Validate accountAddress
     * @param accountAddress accountAddress
     * @throws validation exception
     */
	var validate = function (accountAddress) {
		var errors = [];

		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all accountAddresss as list items
         * @return all accountAddresss as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/accountAddress');
    	},

        /**
         * Get all accountAddresss
         * @return all accountAddresss
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get accountAddress
         * @param id id
         * @return accountAddress
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new accountAddress
         * @param accountAddress accountAddress
         * @return accountAddress saved
         */
		create: function(accountAddress) {
			validate(accountAddress)
			var url = entityURL;
			return $http.post(url, accountAddress);
    	},

        /**
         * Update accountAddress
         * @param accountAddress accountAddress
         * @return accountAddress saved
         */
    	update: function(accountAddress) {
			validate(accountAddress)
			var url = entityURL + '/' + accountAddress.id;
			return $http.put(url, accountAddress);
    	},

		/**
         * Delete accountAddress
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

