var db = require("./db");
var ut = require("./utilities");


function hello (req, res) {
	res.send("Hello World!");
}

function readAnswers(req, res) {
	db.readAnswers(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send(JSON.stringify(rows));
		}
	});
}

function readAllAnswers(req, res) {
	db.readAnswers(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send(ut.printTableHtml(rows));
		}
	});
}

function insertPredefAnswerDb(req, res) {
	db.insertAnswer(['"singel"'], function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Your insert was successfull. You inserted:\n " + JSON.stringify(rows));
		}
	});
}

function insertAnswerDb(req, res) {
	values = [req.body.sivilstatus, req.body.pa_hodet];
	db.insertAnswer(values, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Your insert was successfull. You inserted:\n " + JSON.stringify(rows));
		}
	});
}

function insertAnswer(req,res) {
	res.sendfile("html/insertAnswer.html");
}

function menu(req, res) {
	res.sendfile("html/menuButtons.html");
}

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

function errorHandler(error, response) {
			console.log("There has been an error:");
			console.log(error);
			response.send("There has been an error with the database, check the console for details...");
}



exports.hello = hello;
exports.readAnswers = readAnswers;
exports.insertAnswer = insertAnswer;
exports.insertAnswerDb = insertAnswerDb;
exports.insertPredefAnswerDb = insertPredefAnswerDb;
exports.menu = menu;
exports.deleteAll = deleteAll;
exports.readAllAnswers = readAllAnswers;