'use strict';

/**
 * Controller for AddressType
 **/
addressTypeModule.controller('AddressTypeCtrl', ['AddressType',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(AddressType, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of addressTypes
    $scope.addressTypes = [];
	// addressType to edit
    $scope.addressType = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh addressTypes list
     */
    $scope.refreshAddressTypeList = function() {
    	try {
			$scope.addressTypes = [];
        	AddressType.getAll().then(
				function(success) {
        	        $scope.addressTypes = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh addressType
     */
    $scope.refreshAddressType = function(id) {
    	try {
        	$scope.addressType = null;
	        AddressType.get(id).then(
				function(success) {
        	        $scope.addressType = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the addressTypes list page
     */
    $scope.goToAddressTypeList = function() {
        $scope.refreshAddressTypeList();
        $location.path('/addressType');
    }
    /**
     * Go to the addressType edit page
     */
    $scope.goToAddressType = function(id) {
        $scope.refreshAddressType(id);
        $location.path('/addressType/'+id);
    }

    // Actions

    /**
     * Save addressType
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = AddressType.create;
			} else {
				save = AddressType.update;
			}
			save($scope.addressType).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.addressType = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete addressType
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    AddressType.delete(id).then(
				function(success) {
                	$scope.goToAddressTypeList();
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
        $scope.addressType = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshAddressType($routeParams.id);
    } else {
        // List page
        $scope.refreshAddressTypeList();
    }
    
    
}]);
