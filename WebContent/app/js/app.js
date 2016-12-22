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
  ,'ngExDialog'
 // ,'smart-table'
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
  ,'paymentSchedule.module'
  ,'paymentHistory.module'
])


/**
 * Main configuration
 */
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/welcome.html'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
//Dialog default settings.
myApp.config(['exDialogProvider', function (exDialogProvider) {
    exDialogProvider.setDefaults({        
        template: 'ngExDialog/commonDialog.html', //from cache
        //template: 'ngExDialog/commonDialog_0.html', //from file
        width: '330px',
        //Below items are set within the provider. Any value set here will overwrite that in the provider.
        //closeByXButton: true,
        //closeByClickOutside: true,
        //closeByEscKey: true,
        //appendToElement: '',
        //beforeCloseCallback: '',
        //grayBackground: true,
        //cacheTemplate: true,
        //draggable: true,
        //animation: true,
        //messageTitle: 'Information',
        //messageIcon: 'info',
        //messageCloseButtonLabel: 'OK',
        //confirmTitle: 'Confirmation',
        //confirmIcon: 'question',
        //confirmActionButtonLabel: 'Yes',
        //confirmCloseButtonLabel: 'No'
    });
}])
;
