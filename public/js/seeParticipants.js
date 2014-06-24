function ParticipantsCtrl($scope, $http) {
	$http.get("/getParticipants").success(function(data) {
		$scope.participants = data;
	});
}