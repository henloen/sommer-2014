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

function deleteAll(callback) {
	query("truncate table bod.answers", callback);
}

exports.query = query;
exports.readAnswers = readAnswers;
exports.insertAnswer = insertAnswer;
exports.deleteAll = deleteAll;