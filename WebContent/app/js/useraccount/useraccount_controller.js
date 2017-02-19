'use strict';

/**
 * Controller for UserAccount
 **/
userAccountModule.controller('UserAccountCtrl', ['UserAccount',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(UserAccount, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of userAccounts
    $scope.userAccounts = [];
	// userAccount to edit
    $scope.userAccount = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh userAccounts list
     */
    $scope.refreshUserAccountList = function() {
    	try {
			$scope.userAccounts = [];
        	UserAccount.getAll().then(
				function(success) {
        	        $scope.userAccounts = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh userAccount
     */
    $scope.refreshUserAccount = function(id) {
    	try {
        	$scope.userAccount = null;
	        UserAccount.get(id).then(
				function(success) {
        	        $scope.userAccount = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the userAccounts list page
     */
    $scope.goToUserAccountList = function() {
        $scope.refreshUserAccountList();
        $location.path('/userAccount');
    }
    /**
     * Go to the userAccount edit page
     */
    $scope.goToUserAccount = function(id) {
        $scope.refreshUserAccount(id);
        $location.path('/userAccount/'+id);
    }

    // Actions

    /**
     * Save userAccount
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = UserAccount.create;
			} else {
				save = UserAccount.update;
			}
			save($scope.userAccount).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.userAccount = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete userAccount
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    UserAccount.delete(id).then(
				function(success) {
                	$scope.goToUserAccountList();
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
        $scope.userAccount = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshUserAccount($routeParams.id);
    } else {
        // List page
        $scope.refreshUserAccountList();
    }
    
    
}]);
