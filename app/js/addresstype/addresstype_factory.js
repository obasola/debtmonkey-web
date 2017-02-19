'use strict';

/**
 * Factory for AddressType
 */
addressTypeModule.factory('AddressType', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage addressType
    var entityURL = restURL + '/addressType';
	
	/**
     * Validate addressType
     * @param addressType addressType
     * @throws validation exception
     */
	var validate = function (addressType) {
		var errors = [];
        if( addressType.id == null || addressType.id == '' ) {
			errors.push('addressType.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all addressTypes as list items
         * @return all addressTypes as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/addressType');
    	},

        /**
         * Get all addressTypes
         * @return all addressTypes
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get addressType
         * @param id id
         * @return addressType
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new addressType
         * @param addressType addressType
         * @return addressType saved
         */
		create: function(addressType) {
			validate(addressType)
			var url = entityURL;
			return $http.post(url, addressType);
    	},

        /**
         * Update addressType
         * @param addressType addressType
         * @return addressType saved
         */
    	update: function(addressType) {
			validate(addressType)
			var url = entityURL + '/' + addressType.id;
			return $http.put(url, addressType);
    	},

		/**
         * Delete addressType
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

