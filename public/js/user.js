var db = require("./db");

//used to route '/' to index.html
function index(req, res){
	res.redirect("/public/html/index.html");
}

//Used to get all rows from the database and return them as an array with JSON objects
function readAllAnswers(req, res) {
	db.readAnswers(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send((rows));
		}
	});
}


/*Used to insert the answers received from the form into the database.
Fix the "hardcoding" of the values?
Is called when the user presses submit (http post action)
*/
function insertAnswerDb(req, res) {
	values = [req.body.sivilstatus, req.body.pa_hodet, req.body.alder, 
	req.body.studiested, req.body.programmeringsstil, req.body.musikk, 
	req.body.personlighet, req.body.hypepreferanse, req.body.favorittgode, 
	req.body.planer_for_kvelden, req.body.premie_hvis_du_vinner];
	db.insertAnswer(values, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			db.readOneAnswer(rows['insertId'], function (err, row){
			if(err) {
				errorHandler(err, res);
			}
			else {
				res.send("Ditt svar er nå registrert. Svarene dine var: " + JSON.stringify(row));
				}
			});
		}
	});
}


//Used to truncate (clear/delete) the table. Returns a message to the user if successful
function deleteAll(req, res) {
	db.deleteAll(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Successfully deleted all answers");
		}
	});
}


function insertParticipant(req, res) {
	values = [req.body.email, req.body.name];
	console.log(values);
	db.insertParticipant(values, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Du er nå påmeldt, takk for dine svar.")
		}
	})
}

function getParticipants(req, res) {
	db.getParticipants(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send(rows);
		}
	});
}

function deleteParticipants(req, res) {
	db.deleteParticipants(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Successfully deleted all participants")
		}
	});
}

//Used to handle errors. Look into the error handler provided by express.js?
function errorHandler(error, response) {
			console.log("There has been an error:");
			console.log(error);
			response.send("There has been an error with the database, check the console for details...");
}


exports.index = index;
exports.insertAnswerDb = insertAnswerDb;
exports.deleteAll = deleteAll;
exports.readAllAnswers = readAllAnswers;
exports.insertParticipant = insertParticipant;
exports.getParticipants = getParticipants;
exports.deleteParticipants = deleteParticipants;