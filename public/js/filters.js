"use strict";

/*Filters*/

angular.module("bodApp.filters", [])
	.filter("answersFromTo", function() {
		return function(input, start, end) {
			start = +start;
			input = input || [];
			return input.slice(start, end);
		}
	});