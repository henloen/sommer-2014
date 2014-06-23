function AnswerCtrl($scope, $http) {
	$http.get("/readAnswers").success(function(data) {
		$scope.answers = data;
	});
}