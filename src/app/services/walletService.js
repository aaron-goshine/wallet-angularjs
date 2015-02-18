/**
 * Created by aaron.goshine on 13/02/15.
 */
angular.module('walletAngularjs').factory('walletService',
  ['$rootScope',
    'localStorageService',
    'constants',
    function ($rootScope, localStorageService, constants) {

      function emitChange() {
        $rootScope.$emit(constants.ON_WALLET_CHANGED);
      }

      return {
        getAllWalletEntries: function () {
          var keysFromStorage = localStorageService.keys();
          var entries = [];
          for (var i = 0; i < keysFromStorage.length; i++) {
            var currentKey = keysFromStorage[i];
            var entryFromStorage = localStorageService.get(currentKey);
            entries.push( entryFromStorage);
          }
          return entries;
        },

        getGrandTotal: function () {
          return localStorageService.get(constants.GRAND_TOTAL);
        },
        setGrandTotal: function (value) {
          localStorageService.set(constants.GRAND_TOTAL, value);
        },
        add: function (amount) {
          var grandTotal = this.getGrandTotal();
          var newGrandTotal = grandTotal + amount;
          this.setGrandTotal(newGrandTotal);
          this.insertTransactionAmounts(amount, constants.ADDED);
        },
        reset: function () {
          localStorageService.clearAll();
          emitChange();
        },
        remove: function (amount) {
          var grandTotal = this.getGrandTotal();
          if (amount > grandTotal) {
            $rootScope.$emit(constants.NOT_ENOUGH);
            return false;
          }

          var newGrandTotal = grandTotal - amount;
          this.setGrandTotal(newGrandTotal);
          this.insertTransactionAmounts(amount, constants.REMOVED);
        },
        insertTransactionAmounts: function (amount, transactionType) {
          var entryItem = {
            id: "id" + String(Math.random()).replace(".", "y"),
            amount: amount,
            transactionDate: new Date(),
            transactionType: transactionType
          };
          localStorageService.set(entryItem.id, entryItem);
          emitChange();

        }
      };

    }])
;


