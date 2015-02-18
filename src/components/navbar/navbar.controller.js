'use strict';

angular.module('walletAngularjs')
  .controller('NavbarCtrl', ['$rootScope','$scope', 'walletService','constants', function($rootScope,$scope, walletService,constants) {
    $scope.isCollapsed = true;
    $scope.reset = function() {
      walletService.reset();
    };
    $scope.toggleNavigation = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    }

    $scope.toggleSourceView = function() {
      $rootScope.$emit(constants.TOGGLE_SOURCE_VIEW);
    }

  }]);
