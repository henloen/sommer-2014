function AnswerCtrl($scope, $http) {
	$http.get("/readAnswers").success(function (data) {
		$scope.answers = data;
	});

	$scope.getAnswer = function(id) {
		$http.get("/readAnswers/" +id).success(function (data) {
			$scope.oneAnswer = data[0];
			if (data[0].locked === 0) {
				$http.get("/toggleLockAnswer/" + id);
			}
		});
	}
}

function ParticipantsCtrl($scope, $http) {
	$http.get("/getParticipants").success(function (data) {
		$scope.participants = data;
	});
}

