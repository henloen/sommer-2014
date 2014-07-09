"use strict";

/* Testing the controllers of the app using http backend for mocking  */

/*Main spec*/

describe("BoD controllers", function() {
	var scope, ctrl, deferred, q, answersMock;

	/*Spec of AnswerCtrl*/
	describe("AnswerCtrl", function(){
		/*Is called before each test, defining a the scope, the controller and a mock http service*/
		beforeEach(module("bodApp.controllers", function($provide) {
			 
			 //used to extend the promise returned by $q
			 $provide.decorator('$q', function ($delegate) {
			    var defer = $delegate.defer;
			    $delegate.defer = function () {
			      var deferred = defer();
			      deferred.promise.success = function (fn) {
			        deferred.promise.then(function (value) {
			          fn(value);
			        });
			        return deferred.promise;
			      };
			      deferred.promise.error = function (fn) {
			        deferred.promise.then(null, function (value) {
			          fn(value);
			        });
			        return deferred.promise;
			      };
			      return deferred;
			    };
			    return $delegate;
			  });

			answersMock = {
				getAll : function() {
					var deferred = q.defer();
					deferred.resolve([
						{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
						{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
						{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
					]);
					return deferred.promise;
				},
				get : function(id) {
					var deferred = q.defer();
					deferred.resolve([
						{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":id},
						]);
					return deferred.promise;
				},
				toggleLock : function(id) {
					var deferred = q.defer();
					deferred.resolve();
					return deferred.promise;
				},
				update : function(id) {
					var deferred = q.defer();
					deferred.resolve();
					return deferred.promise;
				},
				deleteAll : function() {
					var deferred = q.defer();
					deferred.resolve();
					return deferred.promise;	
				},
				create : function(answer) {
					var deferred = q.defer();
					deferred.resolve();
					return deferred.promise;
				}
			}
			spyOn(answersMock, "getAll").andCallThrough();
			spyOn(answersMock, "get").andCallThrough();
			spyOn(answersMock, "toggleLock").andCallThrough();
			spyOn(answersMock, "update").andCallThrough();
			spyOn(answersMock, "deleteAll").andCallThrough();
			spyOn(answersMock, "create").andCallThrough();
			$provide.value("Answers", answersMock);
		}));

		beforeEach(
			inject(function($rootScope, $controller, $q) {
				q = $q;
				scope = $rootScope.$new();
				ctrl = $controller("AnswerCtrl", {$scope : scope});
			}));

		it("should have scope.answers to be undefined and then to equal the data returned by the promise, TESTING getAnswers", function() {			
			expect(scope.answers).toBeUndefined();
			scope.$apply();
			expect(scope.answers).toEqual([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				]);
			expect(answersMock.getAll).toHaveBeenCalled();
		});

		it("should have scope.oneAnswer undefined, get an answer based on the id passed in, lock the answer if unlocked and set oneAnswer equal to the answer returned by the promise, TESTING getAnswer", function(id) {
			expect(scope.oneAnswer).toBeUndefined()
			scope.getAnswer(0);
			expect(answersMock.get).toHaveBeenCalledWith(0);
			scope.$apply();
			expect(answersMock.toggleLock).toHaveBeenCalledWith(0);
			expect(scope.oneAnswer).toEqual({"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0});
		});

		it("should have scope.oneAnswer undefined, get an answer based on the id passed in, don't unlock the answer if it's locked if unlocked and set oneAnswer equal to the answer returned by the promise, TESTING getAnswer", function(id) {
			expect(scope.oneAnswer).toBeUndefined()
			scope.getAnswer(1);
			expect(answersMock.get).toHaveBeenCalledWith(1);
			scope.$apply();
			expect(answersMock.toggleLock).not.toHaveBeenCalled();
			expect(scope.oneAnswer).toEqual({"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":1});
		});

		it("should update an answer by unlocking and updating the status of the answer, and then reload all answers, TESTING updateStatus", function() {
			expect(scope.answers).toBeUndefined();
			scope.updateStatus(10);
			expect(answersMock.toggleLock).toHaveBeenCalledWith(10);
			scope.$apply();
			expect(answersMock.update).toHaveBeenCalledWith(10);
			expect(answersMock.getAll).toHaveBeenCalled();
			expect(scope.answers).toEqual([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				]);
		});

		it("should unlock the locked answer and reload all answers, TESTING 'closeAndUnlock'", function() {
			expect(scope.answers).toBeUndefined();
			scope.closeAndUnlock(5);
			expect(answersMock.toggleLock).toHaveBeenCalledWith(5);
			scope.$apply();
			expect(answersMock.getAll).toHaveBeenCalled();
			expect(scope.answers).toEqual([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				]);
		});
	});
});