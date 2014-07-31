"use strict";

/*Filters*/

/*
a filter used to view only a part of the answers,
the input || [] syntax is used to avoid getting errors of undefined array before all data is loaded from the server
*/

angular.module("bodApp.filters", [])
	.filter("answersFromTo", function() {
		return function(input, start, end) {
			start = +start;
			input = input || [];
			return input.slice(start, end);
		};
	});