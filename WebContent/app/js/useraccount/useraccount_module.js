'use strict';

/* Module for UserAccount */

var userAccountModule = angular.module('userAccount.module', ['myApp']);

/**
 * Module for userAccount
 */
userAccountModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/userAccount',    {templateUrl: 'partials/useraccount/useraccount_list.html', controller: 'UserAccountCtrl'});
    $routeProvider.when('/userAccount/new', {templateUrl: 'partials/useraccount/useraccount_form.html', controller: 'UserAccountCtrl'});
    $routeProvider.when('/userAccount/:id', {templateUrl: 'partials/useraccount/useraccount_form.html', controller: 'UserAccountCtrl'});
}]);
