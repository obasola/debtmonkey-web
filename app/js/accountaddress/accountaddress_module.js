'use strict';

/* Module for AccountAddress */

var accountAddressModule = angular.module('accountAddress.module', ['myApp']);

/**
 * Module for accountAddress
 */
accountAddressModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/accountAddress',    {templateUrl: 'partials/accountaddress/accountaddress_list.html', controller: 'AccountAddressCtrl'});
    $routeProvider.when('/accountAddress/new', {templateUrl: 'partials/accountaddress/accountaddress_form.html', controller: 'AccountAddressCtrl'});
    $routeProvider.when('/accountAddress/:id', {templateUrl: 'partials/accountaddress/accountaddress_form.html', controller: 'AccountAddressCtrl'});
}]);
