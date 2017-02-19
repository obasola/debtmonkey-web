'use strict';

/**
 * Controller for Role
 **/
roleModule.controller('RoleCtrl', ['Role',  'UserAccount', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Role, UserAccount, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'UserAccount',     // edition mode
    $scope.mode = null;
    
	// list of roles
    $scope.roles = [];
	// role to edit
    $scope.role = null;

	// referencies entities
	$scope.items = {};
    // userAccounts
	$scope.items.userAccounts = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		UserAccount.getAllAsListItems().then(
				function(success) {
        	        $scope.items.userAccounts = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh roles list
     */
    $scope.refreshRoleList = function() {
    	try {
			$scope.roles = [];
        	Role.getAll().then(
				function(success) {
        	        $scope.roles = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh role
     */
    $scope.refreshRole = function(roleId) {
    	try {
        	$scope.role = null;
	        Role.get(roleId).then(
				function(success) {
        	        $scope.role = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the roles list page
     */
    $scope.goToRoleList = function() {
        $scope.refreshRoleList();
        $location.path('/role');
    }
    /**
     * Go to the role edit page
     */
    $scope.goToRole = function(roleId) {
        $scope.refreshRole(roleId);
        $location.path('/role/'+roleId);
    }

    // Actions

    /**
     * Save role
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Role.create;
			} else {
				save = Role.update;
			}
			save($scope.role).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.role = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete role
     */
    $scope.delete = function(roleId) {
	    try {
			MessageHandler.cleanMessage();
    	    Role.delete(roleId).then(
				function(success) {
                	$scope.goToRoleList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.role = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.roleId != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshRole($routeParams.roleId);
    } else {
        // List page
        $scope.refreshRoleList();
    }
    
    
}]);
