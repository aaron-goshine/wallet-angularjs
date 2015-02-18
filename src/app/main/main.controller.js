/**
 * Created by aaron.goshine on 13/02/15.
 */
'use strict';
angular.module('walletAngularjs')
  .controller('MainCtrl',
  ['walletService',
    '$rootScope',
    '$scope',
    'constants',
    function (walletService, $rootScope, $scope, constants) {

      $scope.init = function () {
        $scope.wallet = {};
        $scope.wallet.form = {};
        $scope.wallet.entries = [];
        $scope.showSource = false;
        $scope.wallet.entries = walletService.getAllWalletEntries();
        $scope.source = JSON.stringify(walletService.getAllWalletEntries(), null, 1);

        $scope.wallet.grandTotal = walletService.getGrandTotal();
        if(!$scope.wallet.grandTotal){
          walletService.setGrandTotal(0);
        }
      }();
      
      $rootScope.$on(constants.ON_WALLET_CHANGED, function () {
        $scope.wallet.grandTotal = walletService.getGrandTotal();
        $scope.wallet.entries = walletService.getAllWalletEntries();
        $scope.source = JSON.stringify(walletService.getAllWalletEntries(), null, 1);
      });

      $rootScope.$on(constants.TOGGLE_SOURCE_VIEW, function () {
        $scope.showSource = !$scope.showSource;
      });

      $rootScope.$on(constants.NOT_ENOUGH, function () {
        $scope.messages['notEnough'] = {
          type: 'danger',
          message: constants.ENOUGH_ERROR_MSG
        };
      });

      $scope.submit = function () {
        $scope.messages = {};
        if (!$scope.wallet.form.entryAmount || $scope.wallet.form.entryAmount < 0) {
          $scope.messages['amount'] = {
            type: 'danger',
            message: constants.AMOUNT_ERROR_MSG
          };
          return;
        }
        if ($scope.wallet.form.removeEnteredAmount) {
          walletService.remove($scope.wallet.form.entryAmount);
        } else {
          walletService.add($scope.wallet.form.entryAmount);
        }
      };

      $scope.wallet.resetWallet = function () {
        $scope.showSource = false;
        walletService.reset();
      };

    }]);
