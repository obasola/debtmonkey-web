'use strict';

/**
 * Factory for UserRole
 */
userRoleModule.factory('UserRole', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage userRole
    var entityURL = restURL + '/userRole';
	
	/**
     * Validate userRole
     * @param userRole userRole
     * @throws validation exception
     */
	var validate = function (userRole) {
		var errors = [];
        if( userRole.userAccountId == null || userRole.userAccountId == '' ) {
			errors.push('userRole.id.not.defined');
		}
        if( userRole.roleRoleId == null || userRole.roleRoleId == '' ) {
			errors.push('userRole.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all userRoles as list items
         * @return all userRoles as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/userRole');
    	},

        /**
         * Get all userRoles
         * @return all userRoles
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get userRole
         * @param userAccountId userAccountId
         * @param roleRoleId roleRoleId
         * @return userRole
         */
    	get: function(userAccountId, roleRoleId) {
    	    var url = entityURL + '/' + userAccountId + '/' + roleRoleId;
        	return $http.get(url);
    	},

        /**
         * Create a new userRole
         * @param userRole userRole
         * @return userRole saved
         */
		create: function(userRole) {
			validate(userRole)
			var url = entityURL;
			return $http.post(url, userRole);
    	},

        /**
         * Update userRole
         * @param userRole userRole
         * @return userRole saved
         */
    	update: function(userRole) {
			validate(userRole)
			var url = entityURL + '/' + userRole.userAccountId + '/' + userRole.roleRoleId;
			return $http.put(url, userRole);
    	},

		/**
         * Delete userRole
         * @param userAccountId userAccountId
         * @param roleRoleId roleRoleId
         */
    	delete: function(userAccountId, roleRoleId) {
        	var url = entityURL + '/' + userAccountId + '/' + roleRoleId;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

