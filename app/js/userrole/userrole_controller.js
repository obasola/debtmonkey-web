'use strict';

/**
 * Controller for UserRole
 **/
userRoleModule.controller('UserRoleCtrl', ['UserRole',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(UserRole, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of userRoles
    $scope.userRoles = [];
	// userRole to edit
    $scope.userRole = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh userRoles list
     */
    $scope.refreshUserRoleList = function() {
    	try {
			$scope.userRoles = [];
        	UserRole.getAll().then(
				function(success) {
        	        $scope.userRoles = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh userRole
     */
    $scope.refreshUserRole = function(userAccountId, roleRoleId) {
    	try {
        	$scope.userRole = null;
	        UserRole.get(userAccountId, roleRoleId).then(
				function(success) {
        	        $scope.userRole = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the userRoles list page
     */
    $scope.goToUserRoleList = function() {
        $scope.refreshUserRoleList();
        $location.path('/userRole');
    }
    /**
     * Go to the userRole edit page
     */
    $scope.goToUserRole = function(userAccountId, roleRoleId) {
        $scope.refreshUserRole(userAccountId, roleRoleId);
        $location.path('/userRole/'+userAccountId+'/'+roleRoleId);
    }

    // Actions

    /**
     * Save userRole
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = UserRole.create;
			} else {
				save = UserRole.update;
			}
			save($scope.userRole).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.userRole = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete userRole
     */
    $scope.delete = function(userAccountId, roleRoleId) {
	    try {
			MessageHandler.cleanMessage();
    	    UserRole.delete(userAccountId, roleRoleId).then(
				function(success) {
                	$scope.goToUserRoleList();
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
        $scope.userRole = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.userAccountId != null && $routeParams.roleRoleId != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshUserRole($routeParams.userAccountId, $routeParams.roleRoleId);
    } else {
        // List page
        $scope.refreshUserRoleList();
    }
    
    
}]);
