
/*Main app*/

angular.module("bodApp", [
	"ngRoute",
	"bodApp.controllers",
	"bodApp.directives"
	]).
config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/partial-index", 
		{
			templateUrl: "partial-index.html"
		});
	$routeProvider.when("/partial-start", 
		{
			templateUrl: "partial-start.html"
		});
	$routeProvider.when("/partial-register-answer", 
		{
			templateUrl: "partial-register-answer-temp.html", controller: "RegisterAnswerCtrl"
		});
	$routeProvider.when("/partial-view-answers", 
		{
			templateUrl: "partial-view-answers.html", controller: "AnswerCtrl"
		});
	$routeProvider.when("/partial-view-participants", 
		{
			templateUrl: "partial-view-participants.html", controller: "ParticipantsCtrl"
		});
	$routeProvider.when("/partial-register-participant", 
		{
			templateUrl: "partial-register-participant.html", controller: "RegisterParticipantCtrl"
		});
	
	$routeProvider.otherwise({redirectTo: "/partial-index"});
}]);