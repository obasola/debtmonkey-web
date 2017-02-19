'use strict';

/**
 * Controller for AccountAddress
 **/
accountAddressModule.controller('AccountAddressCtrl', ['AccountAddress',  'AddressType', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(AccountAddress, AddressType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'AddressType',     // edition mode
    $scope.mode = null;
    
	// list of accountAddresss
    $scope.accountAddresss = [];
	// accountAddress to edit
    $scope.accountAddress = null;

	// referencies entities
	$scope.items = {};
    // addressTypes
	$scope.items.addressTypes = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		AddressType.getAllAsListItems().then(
				function(success) {
        	        $scope.items.addressTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh accountAddresss list
     */
    $scope.refreshAccountAddressList = function() {
    	try {
			$scope.accountAddresss = [];
        	AccountAddress.getAll().then(
				function(success) {
        	        $scope.accountAddresss = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh accountAddress
     */
    $scope.refreshAccountAddress = function(id) {
    	try {
        	$scope.accountAddress = null;
	        AccountAddress.get(id).then(
				function(success) {
        	        $scope.accountAddress = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the accountAddresss list page
     */
    $scope.goToAccountAddressList = function() {
        $scope.refreshAccountAddressList();
        $location.path('/accountAddress');
    }
    /**
     * Go to the accountAddress edit page
     */
    $scope.goToAccountAddress = function(id) {
        $scope.refreshAccountAddress(id);
        $location.path('/accountAddress/'+id);
    }

    // Actions

    /**
     * Save accountAddress
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = AccountAddress.create;
			} else {
				save = AccountAddress.update;
			}
			save($scope.accountAddress).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.accountAddress = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete accountAddress
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    AccountAddress.delete(id).then(
				function(success) {
                	$scope.goToAccountAddressList();
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
        $scope.accountAddress = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshAccountAddress($routeParams.id);
    } else {
        // List page
        $scope.refreshAccountAddressList();
    }
    
    
}]);
