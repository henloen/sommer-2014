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
	query("select * from test.svarinfo", callback);
}

//values is an array containing the values to be inserted
function insertAnswer(values, callback) {
	query("insert into test.svarinfo(sivilstatus, pa_hodet)" +
		"values ('" + values[0] +"', '" + values[1] + "');",callback);
}

function deleteAll(callback) {
	query("truncate table test.svarinfo", callback);
}

exports.query = query;
exports.readAnswers = readAnswers;
exports.insertAnswer = insertAnswer;
exports.deleteAll = deleteAll;