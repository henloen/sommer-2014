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

	    it('can get an instance of my service', function() {

	    	var answers = [
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				];

			$httpBackend.expectGET("/answers").respond(answers);


			var returnedPromise = Answers.getAll()

			$httpBackend.flush();
	    	//expect(Answers).toEqual({});
	    });


	});
});