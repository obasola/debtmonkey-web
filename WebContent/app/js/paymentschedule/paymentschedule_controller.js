'use strict';

/**
 * Controller for PaymentSchedule
 **/
paymentScheduleModule.controller('PaymentScheduleCtrl', ['PaymentSchedule',  'Account', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(PaymentSchedule, Account, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Account',     // edition mode
    $scope.mode = null;
    
	// list of paymentSchedules
    $scope.paymentSchedules = [];
	// paymentSchedule to edit
    $scope.paymentSchedule = null;

	// referencies entities
	$scope.items = {};
    // accounts
	$scope.items.accounts = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Account.getAllAsListItems().then(
				function(success) {
        	        $scope.items.accounts = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh paymentSchedules list
     */
    $scope.refreshPaymentScheduleList = function() {
    	try {
			$scope.paymentSchedules = [];
        	PaymentSchedule.getAll().then(
				function(success) {
        	        $scope.paymentSchedules = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh paymentSchedule
     */
    $scope.refreshPaymentSchedule = function(id) {
    	try {
        	$scope.paymentSchedule = null;
	        PaymentSchedule.get(id).then(
				function(success) {
        	        $scope.paymentSchedule = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the paymentSchedules list page
     */
    $scope.goToPaymentScheduleList = function() {
        $scope.refreshPaymentScheduleList();
        $location.path('/paymentSchedule');
    }
    /**
     * Go to the paymentSchedule edit page
     */
    $scope.goToPaymentSchedule = function(id) {
        $scope.refreshPaymentSchedule(id);
        $location.path('/paymentSchedule/'+id);
    }

    // Actions

    /**
     * Save paymentSchedule
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = PaymentSchedule.create;
			} else {
				save = PaymentSchedule.update;
			}
			save($scope.paymentSchedule).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.paymentSchedule = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete paymentSchedule
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    PaymentSchedule.delete(id).then(
				function(success) {
                	$scope.goToPaymentScheduleList();
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
        $scope.paymentSchedule = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPaymentSchedule($routeParams.id);
    } else {
        // List page
        $scope.refreshPaymentScheduleList();
    }
    
    
}]);
