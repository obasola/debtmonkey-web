'use strict';

/**
 * Factory for UserAccount
 */
userAccountModule.factory('UserAccount', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage userAccount
    var entityURL = restURL + '/userAccount';
	
	/**
     * Validate userAccount
     * @param userAccount userAccount
     * @throws validation exception
     */
	var validate = function (userAccount) {
		var errors = [];
        if( userAccount.id == null || userAccount.id == '' ) {
			errors.push('userAccount.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all userAccounts as list items
         * @return all userAccounts as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/userAccount');
    	},

        /**
         * Get all userAccounts
         * @return all userAccounts
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get userAccount
         * @param id id
         * @return userAccount
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new userAccount
         * @param userAccount userAccount
         * @return userAccount saved
         */
		create: function(userAccount) {
			validate(userAccount)
			var url = entityURL;
			return $http.post(url, userAccount);
    	},

        /**
         * Update userAccount
         * @param userAccount userAccount
         * @return userAccount saved
         */
    	update: function(userAccount) {
			validate(userAccount)
			var url = entityURL + '/' + userAccount.id;
			return $http.put(url, userAccount);
    	},

		/**
         * Delete userAccount
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

