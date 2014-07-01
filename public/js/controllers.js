function AnswerCtrl($scope, $http) {

	$scope.getAnswers = function() {
		$http.get("/readAnswers").success(function (data) {
			$scope.answers = data;
		});
	}

	$scope.getAnswers();

	$scope.getAnswer = function(id) {
		$http.get("/readAnswers/" +id).success(function (data) {
			$scope.oneAnswer = data[0];
			if (data[0].locked === 0) {
				$http.get("/toggleLockAnswer/" + id);
			}
		});
	}

	$scope.updateStatus = function(id) {
		$http.get("/toggleLockAnswer/" + id).success(function() {
			$http.post("/updateAnswerStatus/" + id).success(function() {
				$http.get("/readAnswers").success(function (data) {
					$scope.answers = data;
				});
			});
		});
	}

	$scope.closeAndUnlock = function(id) {
		$http.get("/toggleLockAnswer/" + id).success(function() {
			$http.get("/readAnswers").success(function (data) {
					$scope.answers = data;
			});
		});
	}
}

function ParticipantsCtrl($scope, $http) {
	$http.get("/getParticipants").success(function (data) {
		$scope.participants = data;
	});
}

