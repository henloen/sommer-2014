'use strict';

/* Testing the services of the BoD app */

describe('BoD services', function() {
	var $httpBackend;

  	beforeEach(module('bodApp.services'));


  	describe("Answers service", function() {
  		var Answers;

  		beforeEach(
  			inject(function(_Answers_, _$httpBackend_) {
  				Answers = _Answers_;
  				$httpBackend = _$httpBackend_;
  			})
  		);

  		afterEach(function() {
  			$httpBackend.verifyNoOutstandingExpectation();
  			$httpBackend.verifyNoOutstandingRequest();
  		});

	    it('can get an instance of the Answer service', function() {
	    	expect(Answers).toBeDefined();
	    });

	    it("should make a get request to '/answers' and return the promise, containing the data specified by the mock backend, TESTING getAll", function () {
	    	spyOn(Answers, "getAll").andCallThrough();
	    	var answers = [
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				];
			$httpBackend.expectGET("/answers").respond(answers);

			var returnedPromise = Answers.getAll();
			expect(Answers.getAll).toHaveBeenCalled();

			var returnedData;
			returnedPromise.success(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();

	    	expect(returnedData).toEqual([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				]);
	    });

		it("should make a get request to '/answers/id' and return the promise, containing the data specified by the mock backend, TESTING get", function () {
	    	spyOn(Answers, "get").andCallThrough();
	    	var answers = [
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				];
			$httpBackend.expectGET("/answers/3").respond(answers);

			var returnedPromise = Answers.get(3);
			expect(Answers.get).toHaveBeenCalledWith(3);

			var returnedData;
			returnedPromise.success(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();

	    	expect(returnedData).toEqual([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				]);
	    });

		it("should make a put request to '/toggleLockAnswer/id' and return the promise, TESTING toggleLock", function() {
			spyOn(Answers, "toggleLock").andCallThrough();
			$httpBackend.expectPUT("/toggleLockAnswer/17").respond("succesfully toggled the lock of answer 17");

			var returnedPromise = Answers.toggleLock(17);
			expect(Answers.toggleLock).toHaveBeenCalledWith(17);

			var returnedData;
			returnedPromise.success(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();

			expect(returnedData).toEqual("succesfully toggled the lock of answer 17");

		});

		it("should make a put request to 'answers/id' and return the promise, TESTING update", function () {
			spyOn(Answers, "update").andCallThrough();
			$httpBackend.expectPUT("/answers/42").respond("succesfully updated the status of answer 42");

			var returnedPromise = Answers.update(42);
			expect(Answers.update).toHaveBeenCalledWith(42);

			var returnedData;
			returnedPromise.success(function(data) {
				returnedData = data;
			});			

			$httpBackend.flush();

			expect(returnedData).toEqual("succesfully updated the status of answer 42");
		});


		it("should make a delete request to '/answers' and return the promise, TESTING deleteAll", function () {
			spyOn(Answers, "deleteAll").andCallThrough();
			$httpBackend.expectDELETE("/answers").respond("succesfully deleted all answers");

			var returnedPromise = Answers.deleteAll();
			expect(Answers.deleteAll).toHaveBeenCalled();

			var returnedData;
			returnedPromise.success(function(data) {
				returnedData = data;
			});			

			$httpBackend.flush();

			expect(returnedData).toEqual("succesfully deleted all answers");
		});

		it("should make a post request to '/answers' with the answer data, and return the promise, TESTING create", function () {
			spyOn(Answers, "create").andCallThrough();
			var answer = {"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","kjonn":"mann"};
			$httpBackend.expectPOST("/answers", answer).respond("succesfully registered the answer");

			var returnedPromise = Answers.create(answer);
			expect(Answers.create).toHaveBeenCalledWith(answer);

			var returnedData;
			returnedPromise.success(function(data) {
				returnedData = data;
			});			

			$httpBackend.flush();

			expect(returnedData).toEqual("succesfully registered the answer");
		});
	});

	describe("Participants service", function() {
  		var Participants;

  		beforeEach(
  			inject(function(_Participants_, _$httpBackend_) {
  				Participants = _Participants_;
  				$httpBackend = _$httpBackend_;
  			})
  		);

  		afterEach(function() {
  			$httpBackend.verifyNoOutstandingExpectation();
  			$httpBackend.verifyNoOutstandingRequest();
  		});

  		it("can get an instance of the Participants service", function() {
  			expect(Participants).toBeDefined();
  		});

  		it("should make a get request to '/participants' and return the promise, containing the data specified by the mock backend, TESTING getAll", function () {
  			spyOn(Participants, "getAll").andCallThrough();
  			var participants = [
				{"email":"henrik@test.no","name":"Henrik Tester"},
				{"email":"test1404729597725@lars.no","name":"tester1"},
				{"email":"test1404730290541@lars.no","name":"tester2"},
				{"email":"test1404731209305@lars.no","name":"tester3"},
				];
  			$httpBackend.expectGET("/participants").respond(participants);

			var returnedPromise = Participants.getAll();
			expect(Participants.getAll).toHaveBeenCalled();

			var returnedData;
			returnedPromise.success(function(data) {
				returnedData = data;
			});

			$httpBackend.flush();

	    	expect(returnedData).toEqual([
				{"email":"henrik@test.no","name":"Henrik Tester"},
				{"email":"test1404729597725@lars.no","name":"tester1"},
				{"email":"test1404730290541@lars.no","name":"tester2"},
				{"email":"test1404731209305@lars.no","name":"tester3"},
				]);
  		});

		it("should make a delete request to '/participants' and return the promise, TESTING deleteAll", function () {
			spyOn(Participants, "deleteAll").andCallThrough();
			$httpBackend.expectDELETE("/participants").respond("succesfully deleted all participants");

			var returnedPromise = Participants.deleteAll();
			expect(Participants.deleteAll).toHaveBeenCalled();

			var returnedData;
			returnedPromise.success(function(data) {
				returnedData = data;
			});			

			$httpBackend.flush();

			expect(returnedData).toEqual("succesfully deleted all participants");
		});

		it("should make a post request to '/participants' with the participant data, and return the promise, TESTING create", function () {
			spyOn(Participants, "create").andCallThrough();
			var participant = {email: "henrik l", name: "henrik@test.no"};
			$httpBackend.expectPOST("/participants", participant).respond("succesfully registered the participant");

			var returnedPromise = Participants.create(participant);
			expect(Participants.create).toHaveBeenCalledWith(participant);

			var returnedData;
			returnedPromise.success(function(data) {
				returnedData = data;
			});			

			$httpBackend.flush();

			expect(returnedData).toEqual("succesfully registered the participant");
		});


  	});
});