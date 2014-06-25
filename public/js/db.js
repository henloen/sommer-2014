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
		planerforkvelden, premiehvisduvinner)" +
		"values ('" + values[0] +"', '" + values[1] +"', '" + values[2]
		 +"', '" + values[3] +"', '" + values[4] +"', '" + values[5]
		  +"', '" + values[6] +"', '" + values[7]  +"', '" + values[8]
		   +"', '" + values[9] +"', '" + values[10] + "');",callback);
}

function deleteAnswers(callback) {
	query("truncate table bod.answers", callback);
}

function insertParticipant(values, callback) {
	query("insert into bod.participants(email, name)" + 
		"values ('" + values[0] + "', '" + values[1] + "');", callback);
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




exports.query = query;
exports.readAnswers = readAnswers;
exports.insertAnswer = insertAnswer;
exports.deleteAnswers = deleteAnswers;
exports.insertParticipant = insertParticipant;
exports.readOneAnswer = readOneAnswer;
exports.getParticipants = getParticipants;
exports.deleteParticipants = deleteParticipants;