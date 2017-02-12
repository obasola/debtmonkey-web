'use strict';

/**
 * Controller for PaymentSchedule
 **/
paymentScheduleModule.controller('PaymentScheduleCtrl', ['PaymentSchedule', 'PaymentHistory',
        'Account', 'AccountType', 'exDialog', '$uibModal', '$scope', '$routeParams', '$http',
        '$location','$cookies', 'MessageHandler', 'restURL',
        function (PaymentSchedule, PaymentHistory, Account, AccountType, exDialog,$uibModal,
          $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {

        $scope.mode = null;
        // list of paymentSchedules and Histories
        $scope.paymentSchedules = [];
        $scope.paymentHistory = [];

        // paymentSchedule to edit
        $scope.paymentSchedule = null;
        $scope.scheduledAccount = null;
        $scope.account = null;
        // referencies entities
        $scope.items = {};
        // accounts
        $scope.items.accounts = [];

        $scope.sortColumn = 'name';
        $scope.reverseSort = false;

        $scope.getSortData = function(column) {
            $scope.reverseSort = ($scope.sortColumn == column ? !$scope.reverseSort : false);
            $scope.sortColumn = column;
        };

        $scope.getSortClass = function(column) {
            if($scope.sortColumn === column) {
                return $scope.reverseSort ? 'arrowDown' : 'arrowUp';
            }
            return '';
        };

        /**
         * Refresh paymentSchedules list
         */
        $scope.refreshPaymentScheduleList = function () {
            try {
                $scope.paymentSchedules = [];

                PaymentSchedule.getAll().then(
                        function (success) {
                            $scope.paymentSchedules = success.data;
                        },
                        MessageHandler.manageError);
            } catch (ex) {
                MessageHandler.manageException(ex);
            }
        }
        /**
         * Refresh paymentSchedule
         */
        $scope.refreshPaymentSchedule = function (id) {
            try {
                $scope.paymentSchedule = null;
                PaymentSchedule.get(id).then(
                        function (success) {
                            $scope.paymentSchedule = success.data;
                        },
                        MessageHandler.manageError);
            } catch (ex) {
                MessageHandler.manageException(ex);
            }
        }



        /**
         * Go to the paymentSchedules list page
         */
        $scope.goToPaymentScheduleList = function () {
            $scope.refreshPaymentScheduleList();
            $location.path('/paymentSchedule');
        }
        /**
         * Go to the paymentSchedule edit page
         */
        $scope.goToPaymentSchedule = function (id) {
            $scope.refreshPaymentSchedule(id);
            $location.path('/paymentSchedule/' + id);
        }


        // Actions
        $scope.modifyAccount = function (scheduleId, accountId) {
            // alert("scheduleId ="+scheduleId+" accountId = "+accountId);
             $scope.paymentSchedule = null;
             $scope.account = null;
             try{
                 PaymentSchedule.get(scheduleId).then(
                         function (success) {
                             $scope.scheduledAccount = success.data;
                         },
                         MessageHandler.manageError);
             }catch(ex) {
                 MessageHandler.manageException(ex);
             }


         };
         $scope.$watch('scheduledAccount',  function(newValue, oldValue) {
        	if(newValue != oldValue) {
        		Account.get($scope.scheduledAccount.accountId).then(
                        function (success) {
                       	 $scope.account = success.data;
                         $scope.$parent.paymentSchedule = $scope.scheduledAccount;
                         $scope.$parent.paymentSchedule.accountName = $scope.account.accountName;
                       	// alert("accountName = "+$scope.account.accountName);
                       	// $scope.displayAcctMaintModal();
                        $scope.openModalWindow();
                        },
                        MessageHandler.manageError);
        	}
         });
         $scope.openModalWindow = function() {
           $scope.modalInstance = $uibModal.open({
             templateUrl: 'partials/paymentschedule/modal-template.html'
           });
         };
         /**
         * Load all referencies entities
         */
        $scope.loadAllReferencies = function () {
            Account.getAllAsListItems().then(
              function (success) {
                  $scope.items.accounts = success.data;
              },
              MessageHandler.manageError);
        };

         $scope.closeAcctMaintDialog = function () {
             exDialog.closeAll();
         }
         $scope.updateLastPayment = function() {
           alert("function not implemented.");
         };
        /**
         * Save paymentSchedule
         */
        $scope.save = function () {
            try {
                MessageHandler.cleanMessage();
                var save;
                if ($scope.mode === 'create') {
                    save = PaymentSchedule.create;
                } else {
                    save = PaymentSchedule.update;
                }
                save($scope.paymentSchedule).then(
                        function (success) {
                            MessageHandler.addSuccess('save ok');
                            $scope.paymentSchedule = success.data;
                        },
                        MessageHandler.manageError);
            } catch (ex) {
                MessageHandler.manageException(ex);
            }
        };
        /**
         * Delete paymentSchedule
         */
        $scope.delete = function (id) {
            try {
                MessageHandler.cleanMessage();
                PaymentSchedule.delete(id).then(
                        function (success) {
                            $scope.goToPaymentScheduleList();
                        },
                        MessageHandler.manageError);
            } catch (ex) {
                MessageHandler.manageException(ex);
            }
        };

        // Main
        MessageHandler.cleanMessage();
        if ($location.path().endsWith('/new')) {
            // Creation page
            $scope.paymentSchedule = {};
            $scope.mode = 'create';

            $scope.bookorderitem = null;
        } else if ($routeParams.id != null) {
            // Edit page
            $scope.refreshPaymentSchedule($routeParams.id);
        } else {
            // List page
            $scope.refreshPaymentScheduleList();
        }


    }]);
