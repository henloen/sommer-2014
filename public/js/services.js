"use strict";

/*Services for bodApp*/
angular.module("bodApp.services", [])
	
	//service that communicates with the REST API for answers
	.factory("Answers", function($http) {
		return {
			//gets all answers with a boolean parameter to determine whether all answers or only unprocessed should be fetched
			getAll : function(viewAllArg) {
				return $http.get("/answers", {
					params : {
						viewAll : viewAllArg
					}
				});
			},
			//get the answer with the specified id
			get : function(id) {
				return $http.get("/answers/" + id);
			},
			//locks the answer with the specified id
			toggleLock : function(id) {
				return $http.put("/toggleLockAnswer/" + id);
			},
			//updates the processed status of the answer with the specified id
			update : function(id) {
				return $http.put("/answers/" + id);
			},
			//deletes all answers
			deleteAll : function() {
				return $http.delete("/answers");
			},
			//creates a new answer based on the answer object passed in
			create : function(answer) {
				return $http.post("/answers", answer);
			},
			//deletes the answer with the specified id
			delete : function(id) {
				return $http.delete(/answers/ + id);
			},
			export : function() {
				return $http.get("/exportAnswers");
			}
		};
	})

	//service that communicates with the REST API for participants
	.factory("Participants", function($http) {
		return {
			//gets all participants
			getAll : function() {
				return $http.get("/participants");
			},
			//deletes all participants
			deleteAll : function() {
				return $http.delete("/participants");
			},
			//creates a new participant based on the participant object passed in
			create : function(participant) {
				return $http.post("/participants", participant);
			},
			//marks the participant with that email as winner
			updateWinner: function(email) {
				return $http.post("/winners/" + email);
			},
			//deletes all winners (sets the 'winner' field of all participants to 0)
			deleteWinners: function() {
				return $http.delete("/winners");
			},
			export : function() {
				return $http.get("/exportParticipants");
			}
		};
	})

	.factory("Questions", function() {
		/*
		The object that contains the questions.
		Is sorted alphabetically by default, so a prefix with A-D is used to sort it to make it look nice on the page displayed.
		The object contains four objects, one for each column, which in tur contains the questions for each column.
		This is done to be able to put the questions where we want them.
		To see how this is used, please check the html file where they are displayed, 'partial-register-answer.html'
		The output field is the value displayed to the user, the 'value' field is the the value stored in the database
		*/
		return {
			questions : {
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
				CUtdannelse : {
					title: "Utdannelse",
					name : "utdannelse",
					options : [
						{
							output: "Master",
							value: "master"
						},
						{
							output: "Bachelor",
							value: "bachelor"
						},
						{
							output: "Selvstudert røver",
							value: "selvstudertrover"
						},
						{
							output: "Annet",
							value: "annet"
						}
					]
				}
			},
			BsecondCol: {
				Aprogrammeringsstil : {
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
				Bpersonlighet : {
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
				},
				Chypepreferanse : {
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
						},
						{
							output: "Microservices",
							value: "microservices"
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
				Btype : {
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
				}
			},
			DfourthCol: {
				Bplanerforkvelden : {
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
				Afavorittgode : {
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
					]}
				}
			}
		};
	})
	.factory("RecentAnswer", function() {
		var answer = {};
		return {
			setAnswer : function(recAnswer) {
				answer = {
					kjonn : recAnswer.kjonn,
					sivilstatus : recAnswer.sivilstatus,
					utdannelse : recAnswer.utdannelse,
					programmeringsstil : recAnswer.programmeringsstil,
					personlighet : recAnswer.programmeringsstil,
					hypepreferanse : recAnswer.hypepreferanse,
					musikk : recAnswer.musikk,
					type : recAnswer.type,
					planerforkvelden : recAnswer.planerforkvelden,
					favorittgode : recAnswer.favorittgode
				};
			},
			getAnswer : function() {
				return answer;
			}
		};
	});