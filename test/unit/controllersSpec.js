"use strict";

/* Testing the controllers of the app using http backend for mocking  */

describe("BoD controllers", function() {
	var scope, ctrl, deferred, q;

	/*Spec of AnswerCtrl*/
	describe("AnswerCtrl", function(){
		var answersMock;
		/*Is called before each test, defining a the scope, the controller and a mock Answers service*/
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
				},
				delete : function(id) {
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
			spyOn(answersMock, "delete").andCallThrough();
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

		it("should delete all answers and reload all answers again, TESTING 'deleteAnswers'", function() {
			expect(answersMock.getAll).toHaveBeenCalled();
			expect(scope.answers).toBeUndefined();
			scope.deleteAnswers();
			scope.$apply();
			expect(answersMock.deleteAll).toHaveBeenCalled();
			expect(scope.answers).toEqual([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				]);
		});

		it("should delete the answer and reload all answers, TESTING deleteAnswer", function() {
			expect(answersMock.getAll).toHaveBeenCalled();
			expect(scope.answers).toBeUndefined();
			scope.deleteAnswer(17);
			scope.$apply();
			expect(answersMock.delete).toHaveBeenCalledWith(17);
			expect(scope.answers).toEqual([
				{"id_answers":1,"sivilstatus":"complicated","pa_hodet":"hette","alder":"hipster","studiested":"selvlaertrover","programmeringsstil":"ordenungmusssein","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"gadgetkonto","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"mann","locked":0},
				{"id_answers":3,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"youngster","studiested":"selvlaertrover","programmeringsstil":"detordnerseg","musikk":"disco","personlighet":"ekstrovert","hypepreferanse":"laerkidsakoding","favorittgode":"kurskonferanse","planerforkvelden":"smiskemedsjefen","premiehvisduvinner":"oculusrift","processed":0,"kjonn":"kvinne","locked":0},
				{"id_answers":9,"sivilstatus":"skilt","pa_hodet":"hjelm","alder":"coolcat","studiested":"selvlaertrover","programmeringsstil":"batenblirtil","musikk":"metal","personlighet":"ekstrovert","hypepreferanse":"internetofthings","favorittgode":"frikantine","planerforkvelden":"mingle","premiehvisduvinner":"moto360","processed":0,"kjonn":"kvinne","locked":0}
				]);
		});

	});

	/*Spec of ParticipantsCtrl*/
	describe("ParticipantsCtrl", function(){
		var participantsMock;
		/*Is called before each test, defining a the scope, the controller and a mock Participants*/

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

			participantsMock = {
				getAll : function() {
					var deferred = q.defer();
					deferred.resolve([
						{"email":"henrik@test.no","name":"Henrik Tester", "winner" : 1},
						{"email":"test1404729597725@lars.no","name":"tester1", "winner" : 0},
						{"email":"test1404730290541@lars.no","name":"tester2", "winner" : 0},
						{"email":"test1404731209305@lars.no","name":"tester3", "winner" : 0},
						]);
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
				},
				updateWinner : function(email) {
					var deferred = q.defer();
					deferred.resolve();
					return deferred.promise;	
				},
				deleteWinners : function() {
					var deferred = q.defer();
					deferred.resolve();
					return deferred.promise;
				}
			}
			spyOn(participantsMock, "getAll").andCallThrough();
			spyOn(participantsMock, "deleteAll").andCallThrough();
			spyOn(participantsMock, "create").andCallThrough();
			spyOn(participantsMock, "updateWinner").andCallThrough();
			spyOn(participantsMock, "deleteWinners").andCallThrough();
			$provide.value("Participants", participantsMock);
		}));

		beforeEach(
			inject(function($rootScope, $controller, $q) {
				q = $q;
				scope = $rootScope.$new();
				ctrl = $controller("ParticipantsCtrl", {$scope : scope});
			})
		);

		it("should have 'participants' undefined on start up and define it by loading all answers in database, here mocked as 4 elements, TESTING instantiation", function() {
			expect(scope.participants).toBeUndefined();
			expect(scope.winners).toBeUndefined();
			expect(participantsMock.getAll).toHaveBeenCalled();
			scope.$apply();
			expect(scope.participants).toEqual([
						{"email":"henrik@test.no","name":"Henrik Tester", "winner" : 1},
						{"email":"test1404729597725@lars.no","name":"tester1", "winner" : 0},
						{"email":"test1404730290541@lars.no","name":"tester2", "winner" : 0},
						{"email":"test1404731209305@lars.no","name":"tester3", "winner" : 0},
						]);
		});

		it("should delete all participants and reload all participants, TESTING deleteParticipants", function() {
			expect(scope.participants).toBeUndefined();
			scope.deleteParticipants();
			expect(participantsMock.deleteAll).toHaveBeenCalled();
			scope.$apply();
			expect(participantsMock.getAll).toHaveBeenCalled();
			//even though the participants should have been deleted, we use the moced getAll-method,
			//which doesn't change when the mocked deleteAll method is called.
			expect(scope.participants).toEqual([
						{"email":"henrik@test.no","name":"Henrik Tester", "winner" : 1},
						{"email":"test1404729597725@lars.no","name":"tester1", "winner" : 0},
						{"email":"test1404730290541@lars.no","name":"tester2", "winner" : 0},
						{"email":"test1404731209305@lars.no","name":"tester3", "winner" : 0},
						]);
		});

		it("should pick a winner from the list of participants", function() {
			expect(scope.winners).toBeUndefined();
			expect(scope.participants).toBeUndefined();
			scope.$apply();
			expect(scope.participants).toEqual([
						{"email":"henrik@test.no","name":"Henrik Tester", "winner" : 1},
						{"email":"test1404729597725@lars.no","name":"tester1", "winner" : 0},
						{"email":"test1404730290541@lars.no","name":"tester2", "winner" : 0},
						{"email":"test1404731209305@lars.no","name":"tester3", "winner" : 0},
						]);
			expect(scope.winners).toEqual([{"email":"henrik@test.no","name":"Henrik Tester", "winner" : 1}]);
			scope.pickWinner();
			expect(participantsMock.updateWinner).toHaveBeenCalled();
			expect(participantsMock.getAll).toHaveBeenCalled();
		});

		it("should be able to reset the list of winners", function() {
			expect(scope.winners).toBeUndefined();
			scope.$apply();
			scope.pickWinner();
			expect(participantsMock.updateWinner).toHaveBeenCalled();
			expect(participantsMock.getAll).toHaveBeenCalled();
			scope.deleteWinners();
			expect(participantsMock.deleteWinners).toHaveBeenCalled();
			expect(participantsMock.getAll).toHaveBeenCalled();
		})

		it("should have the filter in getWinners() working properly, showing a winner if the winner attribute is 1", function() {
			expect(scope.winners).toBeUndefined();
			scope.participants = [
						{"email":"henrik@test.no","name":"Henrik Tester", "winner" : 1},
						{"email":"test1404729597725@lars.no","name":"tester1", "winner" : 0},
						{"email":"test1404730290541@lars.no","name":"tester2", "winner" : 0},
						{"email":"test1404731209305@lars.no","name":"tester3", "winner" : 0},
						];
			scope.winners = [];
			scope.pickWinner();
			scope.$apply();
			expect(scope.winners).toEqual([{"email":"henrik@test.no","name":"Henrik Tester", "winner" : 1}]);
		})

	});

	/*Spec of RegisterAnswerCtrl*/
	describe("RegisterAnswerCtrl", function(){
		var answersMock, location;
		/*Is called before each test, defining a the scope, the controller and a mock Participants*/

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

			var questionsMock = {
				questions : {
				}
			}

			var recentAnswerMock = {
				answer : {

				}
			}

			spyOn(answersMock, "getAll").andCallThrough();
			spyOn(answersMock, "get").andCallThrough();
			spyOn(answersMock, "toggleLock").andCallThrough();
			spyOn(answersMock, "update").andCallThrough();
			spyOn(answersMock, "deleteAll").andCallThrough();
			spyOn(answersMock, "create").andCallThrough();
			$provide.value("Answers", answersMock);
			$provide.value("Questions", questionsMock);
			$provide.value("RecentAnswer", recentAnswerMock);
		}));

		beforeEach(
			inject(function($rootScope, $controller, $q, $location) {
				q = $q;
				scope = $rootScope.$new();
				ctrl = $controller("RegisterAnswerCtrl", {$scope : scope});
				location = $location;
			})
		);

		it("should have 'formData' initialized to '{}', call the create method with formData as argument, and relocate to '/partial-register-participant', TESTING submitAnswer", function() {
			spyOn(location, "path")
			expect(scope.formData).toEqual({});
			expect(scope.submitted).toBe(false);
			scope.formData = {sivilstatus:"skilt",pa_hodet:"hjelm",alder:"coolcat",studiested:"selvlaertrover",programmeringsstil:"ordenungmusssein",musikk:"tronderrock",personlighet:"introvert",hypepreferanse:"bigdata",favorittgode:"gadgetkonto",planerforkvelden:"undefined",premiehvisduvinner:"moto360",processed:0,kjonn:"kvinne",locked:0};
			scope.submitAnswer(true);
			expect(answersMock.create).toHaveBeenCalledWith({sivilstatus:"skilt",pa_hodet:"hjelm",alder:"coolcat",studiested:"selvlaertrover",programmeringsstil:"ordenungmusssein",musikk:"tronderrock",personlighet:"introvert",hypepreferanse:"bigdata",favorittgode:"gadgetkonto",planerforkvelden:"undefined",premiehvisduvinner:"moto360",processed:0,kjonn:"kvinne",locked:0});
			scope.$apply();
			expect(location.path).toHaveBeenCalledWith("/partial-register-participant");
		});
	
		it("submitAnswer should set submitted to true if not valid form is submitted, TESTING submitAnswer", function() {
			expect(scope.submitted).toBe(false);
			scope.submitAnswer(false);
			expect(scope.submitted).toBe(true);
		});

	});

	/*Spec of RegisterParticipantCtrl*/
	describe("RegisterParticipantCtrl", function(){
		var participantsMock, location;
		/*Is called before each test, defining a the scope, the controller and a mock Participants*/

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
			          fn(value.data, value.status);
			        });
			        return deferred.promise;
			      };
			      return deferred;
			    };
			    return $delegate;
			  });

			participantsMock = {
				getAll : function() {
					var deferred = q.defer();
					deferred.resolve([
						{"email":"henrik@test.no","name":"Henrik Tester"},
						{"email":"test1404729597725@lars.no","name":"tester1"},
						{"email":"test1404730290541@lars.no","name":"tester2"},
						{"email":"test1404731209305@lars.no","name":"tester3"},
						]);
					return deferred.promise;
				},
				deleteAll : function() {
					var deferred = q.defer();
					deferred.resolve();
					return deferred.promise;	
				},
				create : function(answer) {
					var deferred = q.defer();
					if(answer.email === 'henrik@test.no') {
						deferred.reject({data: "Reject", status: 400});
					}
					else {
						deferred.resolve();
					}
					return deferred.promise;
				},
			}
			spyOn(participantsMock, "getAll").andCallThrough();
			spyOn(participantsMock, "deleteAll").andCallThrough();
			spyOn(participantsMock, "create").andCallThrough();
			$provide.value("Participants", participantsMock);
		}));

		beforeEach(
			inject(function($rootScope, $controller, $q, $location) {
				q = $q;
				scope = $rootScope.$new();
				ctrl = $controller("RegisterParticipantCtrl", {$scope : scope});
				location = $location;
			})
		);

		it("should have 'participant' initialized to '{}', call the create method with it as parameter, and relocate to '/partial-register-participant', TESTING submitParticipant", function() {
			spyOn(location, "path")
			expect(scope.participant).toEqual({});
			scope.participant = {email: "henrikl@test.no", name: "Henrik L"};
			scope.submitParticipant();
			expect(participantsMock.create).toHaveBeenCalledWith({email: "henrikl@test.no", name: "Henrik L"});
			scope.$apply();
			expect(location.path).toHaveBeenCalledWith("/partial-participant-registered");
		});

		it("should have duplicateEmail initialized to '', and when receiving an error it should check whether it's a duplicate, TESTING submitParticipant", function() {
			expect(scope.duplicateEmail).toEqual("");
			scope.participant = {email: "henrik@test.no", name: "Henrik L"};
			scope.submitParticipant();
			expect(participantsMock.create).toHaveBeenCalledWith({email: "henrik@test.no", name: "Henrik L"})
			scope.$apply();
			expect(scope.duplicateEmail).toEqual("henrik@test.no");
		});

		it("should set duplicateEmail to the current email of participant, TESTING setDuplicateEmail", function() {
			expect(scope.duplicateEmail).toEqual("");
			scope.participant = {email: "henrik@test2.no", name: "henrik"};
			scope.setDuplicateEmail();
			expect(scope.duplicateEmail).toEqual("henrik@test2.no");

		})
	});
});