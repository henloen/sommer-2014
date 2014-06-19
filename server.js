var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded());

var port = 3000;

var db = require("./db");
var user = require("./user");

// Routing
app.get("/readAnswers", user.readAllAnswers);
app.get("/insertAnswer", user.insertAnswerPage);
app.post("/insertAnswerDb", user.insertAnswerDb);
app.get("/menu", user.menu);
app.get("/deleteAll", user.deleteAll);


var server = app.listen(port, function() {
	console.log("Listening on port " + port);
});
