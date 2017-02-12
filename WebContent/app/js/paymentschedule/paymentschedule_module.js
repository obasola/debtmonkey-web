'use strict';

/* Module for PaymentSchedule */

var paymentScheduleModule = angular.module('paymentSchedule.module', ['myApp','ui.bootstrap']);

/**
 * Module for paymentSchedule
 */
paymentScheduleModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/paymentSchedule',     {templateUrl: 'partials/paymentschedule/paymentschedule_list.html', controller: 'PaymentScheduleCtrl'});
    $routeProvider.when('/paymentSchedule/new', {templateUrl: 'partials/paymentschedule/paymentschedule_form.html', controller: 'PaymentScheduleCtrl'});
    $routeProvider.when('/paymentSchedule/:id', {templateUrl: 'partials/paymentschedule/paymentschedule_form.html', controller: 'PaymentScheduleCtrl'});

}]);
