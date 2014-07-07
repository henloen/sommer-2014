"use strict";

/*Main app*/

angular.module("bodApp", [
	"ngRoute",
	"bodApp.controllers",
	"bodApp.directives",
	"bodApp.services"
	]).
config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/partial-index", 
		{
			templateUrl: "views/partial-index.html"
		});
	$routeProvider.when("/partial-start", 
		{
			templateUrl: "views/partial-start.html"
		});
	$routeProvider.when("/partial-register-answer", 
		{
			templateUrl: "views/partial-register-answer.html", controller: "RegisterAnswerCtrl"
		});
	$routeProvider.when("/partial-view-answers", 
		{
			templateUrl: "views/partial-view-answers.html", controller: "AnswerCtrl"
		});
	$routeProvider.when("/partial-view-participants", 
		{
			templateUrl: "views/partial-view-participants.html", controller: "ParticipantsCtrl"
		});
	$routeProvider.when("/partial-register-participant", 
		{
			templateUrl: "views/partial-register-participant.html", controller: "RegisterParticipantCtrl"
		});
	$routeProvider.when("/partial-participant-registered", 
		{
			templateUrl: "views/partial-participant-registered.html", controller: "RegisterParticipantCtrl"
		});
	
	$routeProvider.otherwise({redirectTo: "/partial-index"});
}]);