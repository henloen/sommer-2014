angular.module("bodApp.directives", [])

    .directive("makeRadioButtonDetectChange", [function makeRadioButtonDetectChange() {
        return {
                restrict: "A",
                replace: false,
                require: 'ngModel',
                scope: false,
                link: function (scope, element, attrs, ngModelCtrl) {
                    $(element).change(function () {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(element[0].type.toLowerCase() == 'radio' ? element[0].value : element[0].checked);
                        });
                    });
                }
            };
    }]);