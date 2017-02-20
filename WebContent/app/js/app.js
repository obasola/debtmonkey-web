'use strict';

// Add "endsWith" function to the String object
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
   'ngRoute'
  ,'ngResource' 
  ,'ngCookies'
  ,'i18n'
  ,'pascalprecht.translate'
  ,'tmh.dynamicLocale'
  ,'mgcrea.ngStrap.tooltip'
  ,'mgcrea.ngStrap.datepicker'
  ,'myApp.filters'
  ,'myApp.services'
  ,'myApp.directives'
  ,'messageHandler.module'
  ,'account.module'
  ,'accountAddress.module'
  ,'accountType.module'
  ,'addressType.module'
  ,'paymentHistory.module'
  ,'paymentSchedule.module'
  ,'role.module'
  ,'userAccount.module'
  ,'userRole.module'
  ,'admin.module'
]);

myApp.controller('NavBarController', ['Role',  'UserAccount', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', 
    function(Role, UserAccount, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
			$scope.resetActiveTab = function(tabname) {
				alert("You clicked tab: "+tabname);
			} ;
	}
]);


/**
 * Main configuration
 */
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/welcome.html'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
