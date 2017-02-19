'use strict';

/* Module for AddressType */

var addressTypeModule = angular.module('addressType.module', ['myApp']);

/**
 * Module for addressType
 */
addressTypeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/addressType',    {templateUrl: 'partials/addresstype/addresstype_list.html', controller: 'AddressTypeCtrl'});
    $routeProvider.when('/addressType/new', {templateUrl: 'partials/addresstype/addresstype_form.html', controller: 'AddressTypeCtrl'});
    $routeProvider.when('/addressType/:id', {templateUrl: 'partials/addresstype/addresstype_form.html', controller: 'AddressTypeCtrl'});
}]);
