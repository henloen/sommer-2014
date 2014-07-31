"use strict";

/*Controllers*/

angular.module("bodApp.controllers", [])

	//the controller used in the viewing of answers
	.controller("AnswerCtrl", ["$scope", "filterFilter", "Answers", function($scope, filterFilter, Answers) {

		//the number of answers showed in one view
		$scope.limitAnswers = 10;
		//the starting index of the view
		$scope.startAnswers = 0;
		//a boolean deciding whether to view all answers or only unprocessed
		$scope.viewAll = true;

		//toggle the viewAll field and fetch data again to reflect the change
		$scope.toggleViewAll = function() {
			if ($scope.viewAll) {
				$scope.viewAll = false;
			}
			else {
				$scope.viewAll = true;
			}
			$scope.getAnswers();
		};

		//update the index of viewed answers +10
		$scope.tenNextAnswers = function() {
			if ($scope.startAnswers + 10 < $scope.answers.length) {
				$scope.startAnswers += 10;
			}
		};

		//update the index of viewed answers -10
		$scope.tenPrevAnswers = function() {
			if ($scope.startAnswers - 10 >= 0) {
				$scope.startAnswers -= 10;
			}
		};

		//update the index of viewed answers to the last 10
		$scope.tenLastAnswers = function() {
			$scope.startAnswers = $scope.answers.length - lastIndex($scope.answers.length);
		};

		//set the index to the first 10 answers
		$scope.tenFirstAnswers = function() {
			$scope.startAnswers = 0;
		};

		//find the number of unprocessed answers
		$scope.setNumberOfUnprocessed = function() {
			$scope.numberOfUnprocessed = filterFilter($scope.answers, {processed : 0}).length;
		};
		
		/*
		get all answers from the server,
		uses the boolean 'viewAll' and also updates the number of unprocessed answers
		*/
		$scope.getAnswers = function() {
			Answers.getAll($scope.viewAll).success(function (data) {
					$scope.answers = data;
					$scope.setNumberOfUnprocessed();
			});
		};

		//initial call to fetch answers
		$scope.getAnswers();

		/*
		get the answer with the id specified.
		the answer is returned in an array from the server, so to get the answer we are looking for we use data[0]
		locks the answer if it's unlocked
		used when viewing a specific answer when the user presses 'behandle svar'
		*/
		$scope.getAnswer = function(id) {
			Answers.get(id).success(function (data) {
				$scope.oneAnswer = data[0];
				if (data[0].locked === 0) {
					Answers.toggleLock(id);
				}
			});
		};

		/*
		used when the user presses 'merk som behandlet/ubehandlet'
		changes the status of the answer with the id specified,
		unlocks and changes the status of the 'processed' field, and finally gets all answers
		*/
		$scope.updateStatus = function(id) {
			Answers.toggleLock(id).success(function() {
				Answers.update(id).success(function() {
					$scope.getAnswers();
				});
			});
		};
		
		/*
		used when the user closes the dialog,
		unlocks the answer and fetches all answers again
		*/
		$scope.closeAndUnlock = function(id) {
			Answers.toggleLock(id).success(function() {
				$scope.getAnswers();
			});
		};

		/*
		deletes all answers and gets all answers again
		*/
		$scope.deleteAnswers = function() {
			Answers.deleteAll().success(function () {
				$scope.getAnswers();
			});
		};

		/*
		deletes the answer with the specified id and gets all answers again
		*/
		$scope.deleteAnswer = function(id) {
			Answers.delete(id).success(function() {
				$scope.getAnswers();
			});
		};

		/*
		uses a filter to get only unprocessed answers, selects the first elemet,
		and checks the index of that element in the original array.
		then finds the appropriate index, and updates the index
		*/
		$scope.findNextUnprocessed = function() {
			var nextUnprocessed = $scope.answers.indexOf(filterFilter($scope.answers, {processed : 0})[0]);
			var roundedIndex = roundIndex(nextUnprocessed);
			$scope.startAnswers = roundedIndex;

		};

		/*
		helper method for 'findeNextUnprocessed'
		*/
		function roundIndex(index) {
			return index - (index % 10);
		}

		/*
		helper method for 'tenLastAnswers'
		*/
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

	//the controller used in the viewing of participants
	.controller("ParticipantsCtrl", ["$scope", "$http", "filterFilter", "Participants", function($scope, $http, filterFilter, Participants) {

		//initial fetching of participants and updates the list of winners
		Participants.getAll().success(function (data) {
			$scope.participants = data;
			getWinners();
		});

		//index of view
		$scope.startParticipants = 0;
		//number of participants showed in the view
		$scope.limitParticipants = 10;

		//deletes all participants and fetches the participants again
		$scope.deleteParticipants = function() {
			Participants.deleteAll().success(function () {
				Participants.getAll().success(function (data) {
					$scope.participants = data;
				});
			});
		};

		/*
		Used to pick a winner.
		Finds a winner from the list of participants and checks whether the winner already is a winner.
		If so, it picks a new winner recursively.
		If not it marks the participant as a winner, gets all participants again, and updates the list of winners
		*/
		$scope.pickWinner = function() {
			if ($scope.winners.length < $scope.participants.length) {
				var winnerIndex = Math.floor(Math.random() * $scope.participants.length);
				var winnerEmail = $scope.participants[winnerIndex].email;
				if (winnerAlreadyExists(winnerEmail)) {
					$scope.pickWinner();
				}
				else {
					Participants.updateWinner(winnerEmail).success(function () {
						Participants.getAll().success(function (data) {
							$scope.participants = data;
							getWinners();
						});
					});
				}
			}
		};

		//helper method for 'pickWinner', checks if the email passed in is the email of any participant already in the list of winners
		function winnerAlreadyExists (winnerEmail) {
			var i;
			for (i = 0; i< $scope.winners.length; i++) {
				if ($scope.winners[i].email === winnerEmail) {
					return true;
				}
			}
				return false;
		}

		//sets the list of winners
		function getWinners() {
			$scope.winners = filterFilter($scope.participants, {winner : 1});
		}

		//deletes all winners and gets all participants again, since the list of winners is a filtered version of the list of participants
		$scope.deleteWinners = function() {
			Participants.deleteWinners().success(function () {
				Participants.getAll().success(function(data) {
					$scope.participants = data;
					getWinners();
				});
			});
		};

		//updates the index of the viewing of participants +10
		$scope.tenNextParticipants = function() {
			if ($scope.startParticipants + 10 < $scope.participants.length) {
				$scope.startParticipants += 10;
			}
		};

		//updates the index of the viewing of participants -10
		$scope.tenPrevParticipants = function() {
			if ($scope.startParticipants - 10 >= 0) {
				$scope.startParticipants -= 10;
			}
		};

		//updates the index to the last 10 participants
		$scope.tenLastParticipants = function() {
			$scope.startParticipants = $scope.participants.length - lastIndex($scope.participants.length);
		};

		//updates the index to the first participants
		$scope.tenFirstParticipants = function() {
			$scope.startParticipants = 0;
		};

		//helper method of 'tenLastParticipants'
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

	//the controller used on the page where the user registers answers
	.controller("RegisterAnswerCtrl", ["$scope", "$http", "$location", "Answers", function($scope, $http, $location, Answers) {

		//initial object of form data
		$scope.formData = {};
		//boolean determining whether the user has already attempted to submit
		$scope.submitted = false;

		/*used to attempt to submit the answer
		if the answer is valid, the formData object is passed on for creation, and we are redirected to the next page
		if not, the submitted variable is simply set to true
		*/
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

		/*
		The object that contains the questions.
		Is sorted alphabetically by default, so a prefix with A-D is used to sort it to make it look nice on the page displayed.
		The object contains four objects, one for each column, which in tur contains the questions for each column.
		This is done to be able to put the questions where we want them.
		To see how this is used, please check the html file where they are displayed, 'partial-register-answer.html'
		The output field is the value displayed to the user, the 'value' field is the the value stored in the database
		*/
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
				Astudiested : {
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
				Bprogrammeringsstil : {
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
				Cpersonlighet : {
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
		};
}])

	//the controller used on the page where the user registers the contact info
	.controller("RegisterParticipantCtrl", ["$scope", "$http", "$location", "Participants", function($scope, $http, $location, Participants) {

		//initial object of participant
		$scope.participant = {};
		//the initial field of duplicate contact info
		$scope.duplicateEmail = "";

		//a setter for the duplicate email field
		$scope.setDuplicateEmail = function() {
			$scope.duplicateEmail = $scope.participant.email;
		};

		/*
		Used to submit the participant object.
		If no error is received, we are relocated to the next page
		If an error is detected and the status is 400, it's set by the server due to duplicate entry of the primary key (email)
		Sets the attempted email as duplicated, which in turn is used to inform the user
		*/
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
	}]);