/*global $:false */
"use strict";

/*Directives*/

angular.module("bodApp.directives", [])

    /*
    A custom directive partly based on a fix found on github, modified to work in our case
    We had a problem with combining a component of twitter bootstrap radio buttons and angular js forms with radio buttons,
    as both frameworks listened for the same event. This directive needs to be added to our radio buttons, and makes sure the 
    radio buttons are marked as checked for angular as well as twitter bootstrap
    */
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