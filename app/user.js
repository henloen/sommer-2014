var db = require("./db");

//used to route '/' to index.html
function index(req, res){
	res.redirect("/public/index.html");
}

//Used to get all rows from the database and return them as an array with JSON objects
function getAnswers(req, res) {
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
function insertAnswer(req, res) {
	values = {sivilstatus: req.body.sivilstatus, pa_hodet: req.body.pa_hodet, alder: req.body.alder,
	studiested: req.body.studiested, programmeringsstil: req.body.programmeringsstil, musikk: req.body.musikk, 
	personlighet: req.body.personlighet, hypepreferanse: req.body.hypepreferanse, favorittgode: req.body.favorittgode, 
	planerforkvelden: req.body.planerforkvelden, premiehvisduvinner: req.body.premiehvisduvinner, kjonn: req.body.kjonn};
	db.insertAnswer(values, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Successfully registered the answer");
			}
	});
}


//Used to truncate (clear/delete) the table. Returns a message to the user if successful
function deleteAnswers(req, res) {
	db.deleteAnswers(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Successfully deleted all answers");
		}
	});
}

function deleteAnswer(req, res){
	db.deleteAnswer(req.params.id, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Successfully deleted answer with id " + req.params.id);
		}
	});
}


function insertParticipant(req, res) {
	values = {email: req.body.email, name: req.body.name};
	db.insertParticipant(values, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Participant successfully registered");
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

function updateAnswerStatus(req, res) {
	db.updateAnswerStatus(req.params.id, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("status of answer " + req.params.id + " updated");
		}
	});	
}

function getAnswer(req, res) {
	db.readOneAnswer(req.params.id, function(err, row) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send(row);
		}
	})
}

function toggleLockAnswer(req, res) {
	db.toggleLockAnswer(req.params.id, function(err) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Answer: " + req.params.id + " toggled lock");
		}
	})
}

//Used to handle errors. Look into the error handler provided by express.js?
function errorHandler(error, response) {
			console.log("There has been an error:");
			console.log(error);
			if (error.errno === 1062) {
				response.send(400, "The email already exists");
			}
			else {
				response.send(500, "There has been an error with the database, check the console for details...");
			}
}


exports.index              = index;
exports.insertAnswer       = insertAnswer;
exports.deleteAnswers      = deleteAnswers;
exports.getAnswers         = getAnswers;
exports.insertParticipant  = insertParticipant;
exports.getParticipants    = getParticipants;
exports.deleteParticipants = deleteParticipants;
exports.updateAnswerStatus = updateAnswerStatus;
exports.getAnswer          = getAnswer;
exports.toggleLockAnswer   = toggleLockAnswer;
exports.deleteAnswer       = deleteAnswer;