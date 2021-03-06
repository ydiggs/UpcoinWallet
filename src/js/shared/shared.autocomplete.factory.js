(function () {
    'use strict';

    angular
        .module('app.shared')
        .factory('autocomplete.fees', function AutocompleteFeesFactory() {
            var result = {
                fees: [
                    {
                        amount: 0.01,
                        displayText: '0.01 Upcoin (Economic)'
                    },
                    {
                        amount: 0.02,
                        displayText: '0.02 Upcoin (Standard)'
                    },
                    {
                        amount: 0.03,
                        displayText: '0.03 Upcoin (Premium)'
                    }
                ],
                selectedFee: undefined,
                searchText: undefined
            };

            result.getFeeAmount = function() {
                return result.selectedFee ?
                    result.selectedFee.amount :
                    result.searchText;
            };

            result.defaultFee = function (feeAmount) {
                var feeIndex = 0;

                if (angular.isNumber(feeAmount)) {
                    var index = _.findIndex(result.fees, function (fee) {
                        return fee.amount === feeAmount;
                    });

                    if (index >= 0)
                        feeIndex = index;
                }

                result.selectedFee = result.fees[feeIndex];
            };

            result.querySearch = function (searchText) {
                if (!searchText)
                    return result.fees;

                return _.filter(result.fees, function (item) {
                    return item.amount.toString().indexOf(searchText) !== -1;
                });
            };

            return result;
        });
})();
