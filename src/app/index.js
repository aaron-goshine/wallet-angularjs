'use strict';

angular.module('walletAngularjs', ['LocalStorageModule',
  'ngAnimate', 'ngSanitize', 'ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider, localStorageServiceProvider) {

    localStorageServiceProvider
      .setPrefix('walletAngularjs')
      .setStorageType('localStorage');

    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        'redirectTo': '/'
      });

  }).constant('constants', {
    ADDED: 'ADDED',
    GRAND_TOTAL: "GRAND_TOTAL",
    AMOUNT_ERROR_MSG: 'please enter a valid amount, must be greater than zero',
    ON_WALLET_CHANGED: 'ON_WALLET_CHANGED',
    NOT_ENOUGH : 'NOT_ENOUGH',
    ENOUGH_ERROR_MSG :'The amount you are trying to take is too large',
    REMOVED: 'REMOVED',
    SHOULD_REMOVE_MSG: 'Would you like to remove this item',
    TITLE_ERROR_MSG: 'please enter a valid title, must be at least 3 characters long',
    TOGGLE_SOURCE_VIEW: 'TOGGLE_SOURCE_VIEW'
  })
;
