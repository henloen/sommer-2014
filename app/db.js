var mysql = require("mysql");

var connection = mysql.createConnection( {
	host: "10.1.102.26",
	user: "root",
	password: "test"
});
connection.connect();

function query(queryStr, callback) {
	connection.query(queryStr, function(err, rows) {
		console.log("sql statement: " + queryStr)
		if (err) {
			callback(err);
		}
		else {
			callback(null, rows);
		}
	});
}

function readAnswers(callback) {
	query("select * from bod.answers", callback);
}

function readUnprocessedAnswers(callback) {
	query("select * from bod.answers where processed = 0", callback);
}

//values is an array containing the values to be inserted
function insertAnswer(values, callback) {
	query("insert into bod.answers(sivilstatus, pa_hodet, type, studiested, \
		programmeringsstil, musikk, personlighet, hypepreferanse, favorittgode, \
		planerforkvelden, premiehvisduvinner, kjonn)" +
		"values ('" + values.sivilstatus +"', '" + values.pa_hodet +"', '" + values.type
		 +"', '" + values.studiested +"', '" + values.programmeringsstil +"', '" + values.musikk
		  +"', '" + values.personlighet +"', '" + values.hypepreferanse  +"', '" + values.favorittgode
		   +"', '" + values.planerforkvelden +"', '" + values.premiehvisduvinner+ "', '" +
		    values.kjonn + "');",callback);
}

function deleteAnswers(callback) {
	query("truncate table bod.answers", callback);
}

function insertParticipant(values, callback) {
	query("insert into bod.participants(email, name, prize)" + 
		"values ('" + values.email + "', '" + values.name + "', '" + values.prize + "');", callback);
}

function getParticipants(callback) {
	query("select * from bod.participants", callback);
}

function readOneAnswer(id, callback) {
	query("select * from bod.answers where id_answers = " + id + ";", callback);
}

function deleteParticipants(callback) {
	query("truncate table bod.participants", callback);
}

function updateAnswerStatus(id, callback) {
	query("update bod.answers set processed = not processed where id_answers = " + id, callback);
}

function toggleLockAnswer(id, callback) {
	query("update bod.answers set locked = not locked where id_answers = " + id, callback);
}

function deleteAnswer(id, callback) {
	query("delete from bod.answers where id_answers = " + id, callback);
}

function updateWinner(email, callback) {
	query ("update bod.participants set winner = not winner where email = '" + email + "'", callback);
}

function deleteWinners(callback) {
	query("update bod.participants set winner = 0 where winner = 1", callback);
}



exports.query = query;
exports.readAnswers = readAnswers;
exports.insertAnswer = insertAnswer;
exports.deleteAnswers = deleteAnswers;
exports.insertParticipant = insertParticipant;
exports.readOneAnswer = readOneAnswer;
exports.getParticipants = getParticipants;
exports.deleteParticipants = deleteParticipants;
exports.updateAnswerStatus = updateAnswerStatus;
exports.toggleLockAnswer = toggleLockAnswer;
exports.deleteAnswer = deleteAnswer;
exports.updateWinner = updateWinner;
exports.deleteWinners = deleteWinners;
exports.readUnprocessedAnswers = readUnprocessedAnswers;