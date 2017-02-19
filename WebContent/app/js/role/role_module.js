'use strict';

/* Module for Role */

var roleModule = angular.module('role.module', ['myApp']);

/**
 * Module for role
 */
roleModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/role',    {templateUrl: 'partials/role/role_list.html', controller: 'RoleCtrl'});
    $routeProvider.when('/role/new', {templateUrl: 'partials/role/role_form.html', controller: 'RoleCtrl'});
    $routeProvider.when('/role/:roleId', {templateUrl: 'partials/role/role_form.html', controller: 'RoleCtrl'});
}]);
