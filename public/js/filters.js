"use strict";

/*Filters*/

/*
a filter used to view only a part of the answers,
the input || [] syntax is used to avoid getting errors of undefined array before all data is loaded from the server
*/

angular.module("bodApp.filters", [])
	.filter("answersFromTo", function() {
		return function(input, start, end) {
			start = +start;
			input = input || [];
			return input.slice(start, end);
		};
	})
	.filter("prettyString", function() {
		return function(answer) {
			if(answer) {
				
			switch (answer) {
				case "mann":
					return "Mann";
					
				case "kvinne":
					return "Kvinne";
				case "gift/samboer":
					return "Gift/Samboer";
					
				case "skilt":
					return "Skilt";
					
				case "singel":
					return "Singel";
					
				case "complicated":
					return "It's complicated";
					
				case "master":
					return "Master";
					
				case "bachelor":
					return "Bachelor";
					
				case "selvstudertrover":
					return "Selvstudert røver";
					
				case "annet":
					return "Annet";
					
				case "batenblirtil":
					return "Båten blir til mens man ror";
					
				case "detordnerseg":
					return "Det ordner seg";
					
				case "ordenungmusssein":
					return "Ordenung Muss Sein";
					
				case "quickanddirty":
					return "Quick and dirty";
					
				case "introvert":
					return "Introvert";
					
				case "ekstrovert":
					return "Ekstrovert";
					
				case "ekstrovertpluss":
					return "Ekstrovert med litt innabords";
					
				case "bigdata":
					return "Big Data";
					
				case "internetofthings":
					return "Internet of Things";
					
				case "laerkidsakoding":
					return "Lær Kidsa Koding";
					
				case "microservices":
					return "Microservices";
					
				case "rock":
					return "Rock";
					
				case "vglista":
					return "VG-lista";
					
				case "disco":
					return "Disco";
					
				case "tronderrock":
					return "Trønderrock";
					
				case "metal":
					return "Metal";
					
				case "rave":
					return "Rave";
					
				case "klassisk":
					return "Klassisk";
					
				case "alternativ":
					return "Alternativ";
					
				case "youngster":
					return "Youngster";
					
				case "coolcat":
					return "Cool Cat";
					
				case "hipster":
					return "Hipster";
					
				case "gammelringrev":
					return "Gammel Ringrev";
					
				case "nerd":
					return "Nerd";
					
				case "endresivilstatus":
					return "Endre sivilstatus";
					
				case "smiskemedsjefen":
					return "Smiske med sjefen";
					
				case "mingle":
					return "Mingle";
					
				case "kode":
					return "Kode";
					
				case "nytelivet":
					return "Nyte livet";
					
				case "fribar":
					return "Fri bar på julebordet";
					
				case "gadgetkonto":
					return "Gadgetkonto";
					
				case "kurskonferanse":
					return "Kurs og konferanser";
					
				case "frikantine":
					return "Fri kantine";
					
				case "pensjon":
					return "Pensjon";
					
				console
				return answer;
			}
			}
		};
	});
	
