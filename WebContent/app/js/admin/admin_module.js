'use strict';

/* Module for Account */

var adminModule = angular.module('admin.module', ['myApp']);

/**
 * Module for account
 */
adminModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/databaseDesignErd',    {templateUrl: 'partials/admin/database/databaseDesignErd.html', controller: 'AdminCtrl'});

}]);