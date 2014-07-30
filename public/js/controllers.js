"use strict";

/*Controllers*/

angular.module("bodApp.controllers", [])
	.controller("AnswerCtrl", ["$scope", "filterFilter", "Answers", function($scope, filterFilter, Answers) {

		$scope.limitAnswers = 10;
		$scope.viewProcessed = 'processed';
		$scope.startAnswers = 0;
		$scope.viewAll = true;

		$scope.toggleViewAll = function() {
			if ($scope.viewAll) {
				$scope.viewAll = false;
			}
			else {
				$scope.viewAll = true;
			}
			$scope.getAnswers();
		}

		$scope.tenNextAnswers = function() {
			if ($scope.startAnswers + 10 < $scope.answers.length) {
				$scope.startAnswers += 10;
			}
		}

		$scope.tenPrevAnswers = function() {
			if ($scope.startAnswers - 10 >= 0) {
				$scope.startAnswers -= 10;
			}
		}

		$scope.tenLastAnswers = function() {
			$scope.startAnswers = $scope.answers.length - lastIndex($scope.answers.length);
		}

		$scope.tenFirstAnswers = function() {
			$scope.startAnswers = 0;
		}

		$scope.setNumberOfUnprocessed = function() {
			$scope.numberOfUnprocessed = filterFilter($scope.answers, {processed : 0}).length;
		}
		
		$scope.getAnswers = function() {
			Answers.getAll($scope.viewAll).success(function (data) {
					$scope.answers = data;
					$scope.setNumberOfUnprocessed();
			});
		};

		$scope.getAnswers();
		//$scope.setNumberOfUnprocessed();

		$scope.getAnswer = function(id) {
			Answers.get(id).success(function (data) {
				$scope.oneAnswer = data[0];
				if (data[0].locked === 0) {
					Answers.toggleLock(id);
				}
			});
		};

		$scope.updateStatus = function(id) {
			Answers.toggleLock(id).success(function() {
				Answers.update(id).success(function() {
					$scope.getAnswers();
				});
			});
		};
		
		$scope.closeAndUnlock = function(id) {
			Answers.toggleLock(id).success(function() {
				$scope.getAnswers();
			});
		};

		$scope.deleteAnswers = function() {
			Answers.deleteAll().success(function () {
				$scope.getAnswers();
			});
		};

		$scope.deleteAnswer = function(id) {
			Answers.delete(id).success(function() {
				$scope.getAnswers();
			});
		}

		$scope.findNextUnprocessed = function() {
			var nextUnprocessed = $scope.answers.indexOf(filterFilter($scope.answers, {processed : 0})[0]);
			var roundedIndex = roundIndex(nextUnprocessed);
			$scope.startAnswers = roundedIndex;

		};

		function roundIndex(index) {
			return index - (index % 10);
		};

		function lastIndex(length) {
			var mod = length % 10;
			if (mod === 0) {
				return 10;
			}
			else {
				return mod;
			}
		};

	}])

	.controller("ParticipantsCtrl", ["$scope", "$http", "filterFilter", "Participants", function($scope, $http, filterFilter, Participants) {

		Participants.getAll().success(function (data) {
			$scope.participants = data;
			getWinners();
		});

		$scope.startParticipants = 0;
		$scope.limitParticipants = 10;


		$scope.deleteParticipants = function() {
			Participants.deleteAll().success(function () {
				Participants.getAll().success(function (data) {
					$scope.participants = data;
				});
			});
		};

		$scope.pickWinner = function() {
			if ($scope.winners.length < $scope.participants.length) {
				var winnerIndex = Math.floor(Math.random() * $scope.participants.length);
				var winnerEmail = $scope.participants[winnerIndex].email
				if (winnerAlreadyExists(winnerEmail)) {
					$scope.pickWinner();
				}
				else {
					Participants.updateWinner(winnerEmail).success(function () {
						Participants.getAll().success(function (data) {
							$scope.participants = data;
							getWinners();
						})
					});
				}
			}
		}

		function winnerAlreadyExists (winnerEmail) {
			var i;
			for (i = 0; i< $scope.winners.length; i++) {
				if ($scope.winners[i].email === winnerEmail) {
					return true;
				}
			}
				return false;
		}

		function getWinners() {
			$scope.winners = filterFilter($scope.participants, {winner : 1});
		}

		$scope.deleteWinners = function() {
			Participants.deleteWinners().success(function () {
				Participants.getAll().success(function(data) {
					$scope.participants = data;
					getWinners();
				})
			})
		}


		$scope.tenNextParticipants = function() {
			if ($scope.startParticipants + 10 < $scope.participants.length) {
				$scope.startParticipants += 10;
			}
		}

		$scope.tenPrevParticipants = function() {
			if ($scope.startParticipants - 10 >= 0) {
				$scope.startParticipants -= 10;
			}
		}

		$scope.tenLastParticipants = function() {
			$scope.startParticipants = $scope.participants.length - lastIndex($scope.participants.length);
		}

		$scope.tenFirstParticipants = function() {
			$scope.startParticipants = 0;
		}

		function lastIndex(length) {
			var mod = length % 10;
			if (mod === 0) {
				return 10;
			}
			else {
				return mod;
			}
		}

	}])

	.controller("RegisterAnswerCtrl", ["$scope", "$http", "$location", "Answers", function($scope, $http, $location, Answers) {

		$scope.formData = {};
		$scope.submitted = false;

		$scope.submitAnswer = function(isValid) {
			if (isValid) {
				Answers.create($scope.formData).success(function(data) {
					$location.path("/partial-register-participant");
				});
			}
			else
			{
				$scope.submitted = true;
			}
		};

		$scope.questions = {
		AfirstCol :  {
			Akjonn : {
				title : "Kjønn",
				name : "kjonn",
				options : [
					{
						output : "Mann",
						value : "mann"
					}, {
						output: "Kvinne",
						value : "kvinne"
					}
				],
			},
			Bsivilstatus : {
				title: "Sivilstatus",
				name : "sivilstatus",
				options : [
					{
						output: "Gift/Samboer",
						value: "gift/samboer"
					},
					{
						output: "Skilt",
						value: "skilt"
					},
					{
						output: "Singel",
						value: "singel"
					},
					{
						output: "It's complicated",
						value: "complicated"
					},
				]
			},
			Calder : {
				title: "Type",
				name : "type",
				options : [
					{
						output: "Youngster",
						value: "youngster"
					},
					{
						output: "Cool Cat",
						value: "coolcat"
					},
					{
						output: "Hipster",
						value: "hipster"
					},
					{
						output: "Gammel Ringrev",
						value: "gammelringrev"
					},
					{
						output: "Nerd",
						value: "nerd"
					}
				]
			},
		},
		BsecondCol: {
			Bstudiested : {
				title: "Studiested",
				name : "studiested",
				options : [
					{
						output: "NTNU",
						value: "ntnu"
					},
					{
						output: "Selvlært Røver",
						value: "selvlaertrover"
					},
					{
						output: "Annet",
						value: "annet"
					}
				]
			},
			Cprogrammeringsstil : {
				title: "Programmeringsstil",
				name : "programmeringsstil",
				options : [
					{
						output: "Båten blir til mens man ror",
						value: "batenblirtil"
					},
					{
						output: "Det ordner seg",
						value: "detordnerseg"
					},
					{
						output: "Ordenung Muss Sein",
						value: "ordenungmusssein"
					},
					{
						output: "Quick and dirty",
						value: "quickanddirty"
					}
				]
			},
			Dpersonlighet : {
				title: "Personlighet",
				name : "personlighet",
				options : [
					{
						output: "Introvert",
						value: "introvert"
					},
					{
						output: "Ekstrovert",
						value: "ekstrovert"
					},
					{
						output: "Ekstrovert med litt innabords",
						value: "ekstrovertpluss"
					}
				]
			}
		},
		CthirdCol: {
			Amusikk : {
				title: "Musikk",
				name : "musikk",
				options : [
					{
						output: "Rock",
						value: "rock"
					},
					{
						output: "VG-lista",
						value: "vglista"
					},
					{
						output: "Disco",
						value: "disco"
					},
					{
						output: "Trønderrock",
						value: "tronderrock"
					},
					{
						output: "Metal",
						value: "metal"
					},
					{
						output: "Rave",
						value: "rave"
					},
					{
						output: "Klassisk",
						value: "klassisk"
					},
					{
						output: "Alternativ",
						value: "alternativ"
					}
				]
			},
			Bfavorittgode : {
				title: "Favorittgode på jobb",
				name : "favorittgode",
				options : [
					{
						output: "Fri bar på julebordet",
						value: "fribar"
					},
					{
						output: "Gadgetkonto",
						value: "gadgetkonto"
					},
					{
						output: "Kurs og konferanser",
						value: "kurskonferanse"
					},
					{
						output: "Fri kantine",
						value: "frikantine"
					},
					{
						output: "Pensjon",
						value: "pensjon"
					}
				]
			},

		},
		DfourthCol: {
			Aplanerforkvelden : {
				title: "Planer for kvelden",
				name : "planerforkvelden",
				options : [
					{
						output: "Endre sivilstatus",
						value: "endresivilstatus"
					},
					{
						output: "Smiske med sjefen",
						value: "smiskemedsjefen"
					},
					{
						output: "Mingle",
						value: "mingle"
					},
					{
						output: "Kode",
						value: "kode"
					},
					{
						output: "Nyte livet",
						value: "nytelivet"
					}
				]
			},
			Bhypepreferanse : {
				title: "Hype-preferanse",
				name : "hypepreferanse",
				options : [
					{
						output: "Big Data",
						value: "bigdata"
					},
					{
						output: "Internet of Things",
						value: "internetofthings"
					},
					{
						output: "Lær Kidsa Koding",
						value: "laerkidsakoding"
					}
				]
			},
			Cpremie : {
				title: "Premie hvis du vinner",
				name : "premiehvisduvinner",
				options : [
					{
						output: "Moto360",
						value: "moto360"
					},
					{
						output: "Oculus Rift",
						value: "oculusrift"
					},
					{
						output: "Blomster",
						value: "blomster"
					},
					{
						output: "Fruktkurv",
						value: "fruktkurv"
					}
				]
			}
		}
	}
}])

	.controller("RegisterParticipantCtrl", ["$scope", "$http", "$location", "Participants", function($scope, $http, $location, Participants) {

		$scope.participant = {};
		$scope.duplicateEmail = "";

		$scope.setDuplicateEmail = function() {
			$scope.duplicateEmail = $scope.participant.email;
		}


		$scope.submitParticipant = function() {
			Participants.create($scope.participant)
			.success(function(data){
				$location.path("/partial-participant-registered");
			})
			.error(function(data, status) {
				if (status === 400) {
					$scope.setDuplicateEmail();
				}
			});
		};
	}])