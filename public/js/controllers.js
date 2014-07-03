
/*Controllers*/

angular.module("bodApp.controllers", [])
	.controller("AnswerCtrl", ["$scope", "$http", function($scope, $http) {
		
		$scope.getAnswers = function() {
			$http.get("/answers").success(function (data) {
				$scope.answers = data;
			});
		}

		$scope.getAnswers();

		$scope.getAnswer = function(id) {
			$http.get("/answers/" +id).success(function (data) {
				$scope.oneAnswer = data[0];
				if (data[0].locked === 0) {
					$http.put("/toggleLockAnswer/" + id);
				}
			});
		}

		$scope.updateStatus = function(id) {
			$http.put("/toggleLockAnswer/" + id).success(function() {
				$http.put("/answers/" + id).success(function() {
					$http.get("/answers").success(function (data) {
						$scope.answers = data;
					});
				});
			});
		}
		
		$scope.closeAndUnlock = function(id) {
			$http.put("/toggleLockAnswer/" + id).success(function() {
				$http.get("/answers").success(function (data) {
						$scope.answers = data;
				});
			});
		}

		$scope.deleteAnswers = function() {
			$http.delete("/answers").success(function () {
				$http.get("/answers").success(function (data) {
					$scope.answers = data;
				});
			});
		}
		
	}])
	.controller("ParticipantsCtrl", ["$scope", "$http", function($scope, $http) {

		$http.get("/participants").success(function (data) {
			$scope.participants = data;
		});

		$scope.deleteParticipants =function() {
			$http.delete("/participants").success(function () {
				$http.get("/participants").success(function (data) {
					$scope.participants = data;
				} )
			})
		}
		
	}])
	.controller("RegisterAnswerCtrl", ["$scope", "$http", function($scope, $http) {

		$scope.formData = {};

		$scope.submitForm = function() {
			$http.post("/anwers", $scope.formData).success(function() {
				console.log("form posting worked!")
			})
		};

	}])