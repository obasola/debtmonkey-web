'use strict';

/**
 * Factory for Role
 */
roleModule.factory('Role', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage role
    var entityURL = restURL + '/role';
	
	/**
     * Validate role
     * @param role role
     * @throws validation exception
     */
	var validate = function (role) {
		var errors = [];
        if( role.roleId == null || role.roleId == '' ) {
			errors.push('role.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all roles as list items
         * @return all roles as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/role');
    	},

        /**
         * Get all roles
         * @return all roles
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get role
         * @param roleId roleId
         * @return role
         */
    	get: function(roleId) {
    	    var url = entityURL + '/' + roleId;
        	return $http.get(url);
    	},

        /**
         * Create a new role
         * @param role role
         * @return role saved
         */
		create: function(role) {
			validate(role)
			var url = entityURL;
			return $http.post(url, role);
    	},

        /**
         * Update role
         * @param role role
         * @return role saved
         */
    	update: function(role) {
			validate(role)
			var url = entityURL + '/' + role.roleId;
			return $http.put(url, role);
    	},

		/**
         * Delete role
         * @param roleId roleId
         */
    	delete: function(roleId) {
        	var url = entityURL + '/' + roleId;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

