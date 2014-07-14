"use strict";

/* Testing the controllers and services of the BoD app at the same time, mocking the backend API with $httpBackend*/

describe("BoD controllers and services", function() {
	var scope, ctrl, $httpBackend;

	beforeEach(module("bodApp.controllers"));
	beforeEach(module("bodApp.services"));



	/*Spec of AnswerCtrl*/
	describe("AnswerCtrl", function(){

		/*Is called before each test, defining a the scope, the controller and a mock http service*/
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			scope = $rootScope.$new();
			ctrl = $controller("AnswerCtrl", {$scope : scope});

		/*the controller loads all the answers with a get request to "/answers"
		at instantiation, so even though we are not testing that functionality,
		we have to expect the request for the test to pass*/
			$httpBackend.expectGET("/answers?viewAll=false").respond([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				]);
		}));

		/*Verifying that all expected http requests have been done*/
		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it("should have 'answers' undefined on start up and define 'answers' with three answers fetched from mock http backend, TESTING 'getAnswers'", function() {
			expect(scope.answers).toBeUndefined();

			$httpBackend.flush();

			expect(scope.answers).toEqual([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				]);
		});


		it("should have 'oneAnswer' undefined on start up, get one answer based on id and lock it if the answer is unlocked, TESTING 'getAnswer'", function() {
			$httpBackend.expectGET("/answers/1").respond([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				]);
			$httpBackend.expectPUT("/toggleLockAnswer/1").respond("Answer: 1 toggled lock");

			expect(scope.oneAnswer).toBeUndefined();

			scope.getAnswer(1);

			$httpBackend.flush();

			expect(scope.oneAnswer).toEqual({"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0});
		});

		it("should have 'oneAnswer' undefined on start up, get one answer based on id and not change lock status it if it's already locked, TESTING 'getAnswer'", function() {
			$httpBackend.expectGET("/answers/1").respond([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":1},
				]);

			expect(scope.oneAnswer).toBeUndefined();

			scope.getAnswer(1);

			$httpBackend.flush();

			expect(scope.oneAnswer).toEqual({"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":1});

		});

		it("should update an answer by unlocking and updating the status of the answer, and then reload all answers, TESTING 'updateStatus'", function() {
			$httpBackend.expectPUT("/toggleLockAnswer/1").respond("Answer: 1 toggled lock");
			$httpBackend.expectPUT("/answers/1").respond("status of answer 1 updated");
			$httpBackend.expectGET("/answers?viewAll=false").respond([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":1,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				]);

			scope.answers = [{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0}];

			expect(scope.answers[0].processed).toEqual(0);

			scope.updateStatus(1);

			expect(scope.answers[0].processed).toEqual(0);

			$httpBackend.flush();

			expect(scope.answers[0].processed).toEqual(1);
		});

		it("should unlock the locked answer and reload all answers, TESTING 'closeAndUnlock'", function() {
			$httpBackend.expectPUT("/toggleLockAnswer/1").respond("Answer: 1 toggled lock");
			$httpBackend.expectGET("/answers?viewAll=false").respond([{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0}]);

			scope.answers = [{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":1}];

			expect(scope.answers[0].locked).toEqual(1);

			scope.closeAndUnlock(1);

			$httpBackend.flush();

			expect(scope.answers[0].locked).toEqual(0);
		});

		it("should delete all answers and reload all answers again, TESTING 'deleteAnswers'", function() {
			$httpBackend.expectDELETE("/answers").respond("Successfully deleted all answers");
			$httpBackend.expectGET("/answers?viewAll=false").respond([]);
			
			scope.answers = [
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				];

			expect(scope.answers).toEqual([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				]);

			scope.deleteAnswers();

			$httpBackend.flush();

			expect(scope.answers).toEqual([]);
		});
	});

	describe("ParticipantsCtrl", function(){

		/*Is called before each test, defining a the scope, the controller and a mock http service*/
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			scope = $rootScope.$new();
			ctrl = $controller("ParticipantsCtrl", {$scope : scope});

			$httpBackend.expectGET("/participants").respond([
				{"email":"henrik@test.no","name":"Henrik Tester"},
				{"email":"test1404729597725@lars.no","name":"tester1"},
				{"email":"test1404730290541@lars.no","name":"tester2"},
				{"email":"test1404731209305@lars.no","name":"tester3"},
				]);
		}));

		/*Verifying that all expected http requests have been done*/
		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it("should have 'participants' undefined on start up and define it by loading all answers in database, here mocked as 4 elements, TESTING instantiation", function() {

			expect(scope.participants).toBeUndefined();

			$httpBackend.flush();

			expect(scope.participants).toEqual([
				{"email":"henrik@test.no","name":"Henrik Tester"},
				{"email":"test1404729597725@lars.no","name":"tester1"},
				{"email":"test1404730290541@lars.no","name":"tester2"},
				{"email":"test1404731209305@lars.no","name":"tester3"},
				]);
		});

		it("should delete all participants and reload all participants, TESTING deleteParticipants", function() {
			$httpBackend.expectDELETE("/participants").respond("Successfully deleted all participants");
			$httpBackend.expectGET("/participants").respond([]);
			scope.participants = [
				{"email":"henrik@test.no","name":"Henrik Tester"},
				{"email":"test1404729597725@lars.no","name":"tester1"},
				{"email":"test1404730290541@lars.no","name":"tester2"},
				{"email":"test1404731209305@lars.no","name":"tester3"},
				];

			expect(scope.participants).toEqual([
				{"email":"henrik@test.no","name":"Henrik Tester"},
				{"email":"test1404729597725@lars.no","name":"tester1"},
				{"email":"test1404730290541@lars.no","name":"tester2"},
				{"email":"test1404731209305@lars.no","name":"tester3"},
				]);

			scope.deleteParticipants();

			$httpBackend.flush();

			expect(scope.participants).toEqual([]);
		});
	});

	describe("RegisterAnswerCtrl", function(){
		var location;

		/*Is called before each test, defining a the scope, the controller and a mock http service*/
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $location) {
			$httpBackend = _$httpBackend_;
			scope = $rootScope.$new();
			ctrl = $controller("RegisterAnswerCtrl", {$scope : scope});
			location = $location;

		}));

		/*Verifying that all expected http requests have been done*/
		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it("should have 'formData' initialized to '{}', post the object to '/answers' and relocate to '/partial-register-participant', TESTING submitAnswer", function() {
			$httpBackend.expectPOST("/answers", {sivilstatus:"skilt",pa_hodet:"hjelm",alder:"coolcat",studiested:"selvlaertrover",programmeringsstil:"ordenungmusssein",musikk:"tronderrock",personlighet:"introvert",hypepreferanse:"bigdata",favorittgode:"gadgetkonto",planerforkvelden:"undefined",premiehvisduvinner:"moto360",processed:0,kjonn:"kvinne",locked:0}).respond("The answer was successfully recorded");
			spyOn(location, 'path');

			expect(scope.formData).toEqual({});

			scope.formData = {sivilstatus:"skilt",pa_hodet:"hjelm",alder:"coolcat",studiested:"selvlaertrover",programmeringsstil:"ordenungmusssein",musikk:"tronderrock",personlighet:"introvert",hypepreferanse:"bigdata",favorittgode:"gadgetkonto",planerforkvelden:"undefined",premiehvisduvinner:"moto360",processed:0,kjonn:"kvinne",locked:0};
			scope.submitAnswer(scope.formData);

			$httpBackend.flush();

			expect(location.path).toHaveBeenCalledWith("/partial-register-participant");
		});
	});

	describe("RegisterParticipantCtrl", function() {
		var location;

		/*Is called before each test, defining a the scope, the controller and a mock http service*/
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $location) {
			$httpBackend = _$httpBackend_;
			scope = $rootScope.$new();
			ctrl = $controller("RegisterParticipantCtrl", {$scope : scope});
			location = $location;
		}));

		/*Verifying that all expected http requests have been done*/
		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it("should have 'participant' initialized to '{}', post the object to '/participants' and relocate to '/partial-participant-registered', TESTING submitParticipant", function() {
			$httpBackend.expectPOST("/participants", {email: "henrik l", name: "henrik@test.no"}).respond("Participant successfully registered");
			spyOn(location, 'path');

			expect(scope.participant).toEqual({});

			scope.participant = {email: "henrik l", name: "henrik@test.no"};
			scope.submitParticipant();

			$httpBackend.flush();

			expect(location.path).toHaveBeenCalledWith("/partial-participant-registered");
		});
	});
	

});