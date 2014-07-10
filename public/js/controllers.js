"use strict";

/*Controllers*/

angular.module("bodApp.controllers", [])
	.controller("AnswerCtrl", ["$scope", "Answers", function($scope, Answers) {
		
		$scope.getAnswers = function() {
			Answers.getAll().success(function (data) {
				$scope.answers = data;
			});
		};

		$scope.getAnswers();

		$scope.getAnswer = function(id) {
			Answers.get(id).success(function (data) {
				$scope.oneAnswer = data[0];
				if (data[0].locked === 0) {
					Answers.toggleLock(id);
				}
			});
		};

		$scope.updateStatus = function(id) {
			Answers.toggleLock(id).success(function() {
				Answers.update(id).success(function() {
					Answers.getAll().success(function (data) {
						$scope.answers = data;
					});
				});
			});
		};
		
		$scope.closeAndUnlock = function(id) {
			Answers.toggleLock(id).success(function() {
				Answers.getAll().success(function (data) {
						$scope.answers = data;
				});
			});
		};

		$scope.deleteAnswers = function() {
			Answers.deleteAll().success(function () {
				Answers.getAll().success(function (data) {
					$scope.answers = data;
				});
			});
		};		
	}])

	.controller("ParticipantsCtrl", ["$scope", "$http", "Participants", function($scope, $http, Participants) {

		Participants.getAll().success(function (data) {
			$scope.participants = data;
		});

		$scope.deleteParticipants =function() {
			Participants.deleteAll().success(function () {
				Participants.getAll().success(function (data) {
					$scope.participants = data;
				});
			});
		};
	}])

	.controller("RegisterAnswerCtrl", ["$scope", "$http", "$location", "Answers", function($scope, $http, $location, Answers) {

		$scope.formData = {};

		$scope.submitAnswer = function() {
			Answers.create($scope.formData).success(function(data) {
				$location.path("/partial-register-participant");
			});
		};
	}])

	.controller("RegisterParticipantCtrl", ["$scope", "$http", "$location", "Participants", function($scope, $http, $location, Participants) {

		$scope.participant = {};

		/*$scope.submitParticipant = function() {
			Participants.create($.param($scope.participant))
			.success(function(data) {
				$location.path("/partial-participant-registered");
			});
		};*/
		$scope.submitParticipant = function() {
			Participants.create($scope.participant)
			.success(function(data){
				$location.path("/partial-participant-registered");
			});
		};
	}])