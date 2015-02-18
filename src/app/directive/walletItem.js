/**
 * Created by aaron.goshine on 13/02/15.
 */
angular.module('walletAngularjs')
  .directive('walletItem', ['constants', function (constants) {
    return {
      restrict: 'E',
      template: '<li class="list-group-item" ng-class="{deleted:false}">' +
      '<div class="amount">&#3647;{{::entry.amount}}</div>' +
      '<div class="date">{{getTransactionLabel()+(entry.transactionDate | date : "medium")}}</div>'+
      '</li>',
      scope: {
        entry: "="
      },
      link: function(scope) {
        scope.getTransactionLabel = function () {
          var map = {
            ADDED: "Added on ",
            REMOVED: "Removed on "
          };

          return map[scope.entry.transactionType]
        }
      },
      replace: true
    };
  }])
;




