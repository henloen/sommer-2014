"use strict";

/*Services for bodApp*/
angular.module("bodApp.services", [])

	.factory("Answers", function($http) {
		return {
			getAll : function() {
				return $http.get("/answers");
			},
			get : function(id) {
				return $http.get("/answers/" + id);
			},
			toggleLock : function(id) {
				return $http.put("/toggleLockAnswer/" + id);
			},
			update : function(id) {
				return $http.put("/answers/" + id);
			},
			deleteAll : function() {
				return $http.delete("/answers")
			},
			create : function(answer) {
				return $http({
				method : "POST",
				url : "/answers",
				data : answer,
				headers : {"Content-Type" : "application/x-www-form-urlencoded"}
				})
			}
		}
	})

	.factory("Participants", function($http) {
		return {
			getAll : function() {
				return $http.get("/participants");
			},
			deleteAll : function() {
				return $http.delete("/participants")
			},
		/*	create : function(participant) {
				return 	$http({
				method : "POST",
				url : "/participants",
				data : participant,
				headers : {"Content-Type" : "application/x-www-form-urlencoded"}
				})
			}	*/
			create : function(participant) {
				return $http.post("/participants", participant)
			}
		}
	})