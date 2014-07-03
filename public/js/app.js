
/*Main app*/

angular.module("bodApp", [
	"ngRoute",
	"bodApp.controllers"
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
			templateUrl: "partial-register-answer.html"
		});
	$routeProvider.when("/partial-view-answers", 
		{
			templateUrl: "partial-view-answers.html", controller: "AnswerCtrl"
		});
	$routeProvider.when("/partial-view-participants", 
		{
			templateUrl: "partial-view-participants.html", controller: "ParticipantsCtrl"
		});

	
	$routeProvider.otherwise({redirectTo: "/partial-index"});
}]);