"use strict";

/*Filters*/

angular.module("bodApp.filters", [])
	.filter("startFrom", function() {
		return function(input, start) {
			start = +start;
			input = input || [];
			return input.slice(start);
		}
	});