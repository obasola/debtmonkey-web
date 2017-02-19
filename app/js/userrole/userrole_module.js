'use strict';

/* Module for UserRole */

var userRoleModule = angular.module('userRole.module', ['myApp']);

/**
 * Module for userRole
 */
userRoleModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/userRole',    {templateUrl: 'partials/userrole/userrole_list.html', controller: 'UserRoleCtrl'});
    $routeProvider.when('/userRole/new', {templateUrl: 'partials/userrole/userrole_form.html', controller: 'UserRoleCtrl'});
    $routeProvider.when('/userRole/:userAccountId/:roleRoleId', {templateUrl: 'partials/userrole/userrole_form.html', controller: 'UserRoleCtrl'});
}]);
