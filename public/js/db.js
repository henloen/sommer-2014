var mysql = require("mysql");

var connection = mysql.createConnection( {
	host: "localhost",
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


//values is an array containing the values to be inserted
function insertAnswer(values, callback) {
	query("insert into bod.answers(sivilstatus, pa_hodet, alder, studiested, \
		programmeringsstil, musikk, personlighet, hypepreferanse, favorittgode, \
		planerforkvelden, premiehvisduvinner, kjonn)" +
		"values ('" + values.sivilstatus +"', '" + values.pa_hodet +"', '" + values.alder
		 +"', '" + values.studiested +"', '" + values.programmeringsstil +"', '" + values.musikk
		  +"', '" + values.personlighet +"', '" + values.hypepreferanse  +"', '" + values.favorittgode
		   +"', '" + values.planer_for_kvelden +"', '" + values.premie_hvis_du_vinner+ "', '" +
		    values.kjonn + "');",callback);
}

function deleteAnswers(callback) {
	query("truncate table bod.answers", callback);
}

function insertParticipant(values, callback) {
	query("insert into bod.participants(email, name)" + 
		"values ('" + values.email + "', '" + values.name + "');", callback);
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




exports.query = query;
exports.readAnswers = readAnswers;
exports.insertAnswer = insertAnswer;
exports.deleteAnswers = deleteAnswers;
exports.insertParticipant = insertParticipant;
exports.readOneAnswer = readOneAnswer;
exports.getParticipants = getParticipants;
exports.deleteParticipants = deleteParticipants;
exports.updateAnswerStatus = updateAnswerStatus;