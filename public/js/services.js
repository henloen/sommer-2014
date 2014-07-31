"use strict";

/*Services for bodApp*/
angular.module("bodApp.services", [])
	
	//service that communicates with the REST API for answers
	.factory("Answers", function($http) {
		return {
			//gets all answers with a boolean parameter to determine whether all answers or only unprocessed should be fetched
			getAll : function(viewAllArg) {
				return $http.get("/answers", {
					params : {
						viewAll : viewAllArg
					}
				});
			},
			//get the answer with the specified id
			get : function(id) {
				return $http.get("/answers/" + id);
			},
			//locks the answer with the specified id
			toggleLock : function(id) {
				return $http.put("/toggleLockAnswer/" + id);
			},
			//updates the processed status of the answer with the specified id
			update : function(id) {
				return $http.put("/answers/" + id);
			},
			//deletes all answers
			deleteAll : function() {
				return $http.delete("/answers");
			},
			//creates a new answer based on the answer object passed in
			create : function(answer) {
				return $http.post("/answers", answer);
			},
			//deletes the answer with the specified id
			delete : function(id) {
				return $http.delete(/answers/ + id);
			}
		};
	})

	//service that communicates with the REST API for participants
	.factory("Participants", function($http) {
		return {
			//gets all participants
			getAll : function() {
				return $http.get("/participants");
			},
			//deletes all participants
			deleteAll : function() {
				return $http.delete("/participants");
			},
			//creates a new participant based on the participant object passed in
			create : function(participant) {
				return $http.post("/participants", participant);
			},
			//marks the participant with that email as winner
			updateWinner: function(email) {
				return $http.post("/winners/" + email);
			},
			//deletes all winners (sets the 'winner' field of all participants to 0)
			deleteWinners: function() {
				return $http.delete("/winners");
			}
		};
	});