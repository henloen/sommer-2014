var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded());

var port = 3000;

var db = require("./js/db");
var user = require("./js/user");

// Routing
app.get("/readAnswers", user.readAllAnswers);
app.get("/insertAnswer", user.insertAnswerPage);
app.post("/insertAnswerDb", user.insertAnswerDb);
app.get("/index", user.index);
app.get("/deleteAll", user.deleteAll);
app.get("/html/stylesheet.css", user.stylesheet);
app.get("/external_libs/angular.min.js", user.jsAngularminjs);
app.get("/js/app.js", user.jsAppjs)


var server = app.listen(port, function() {
	console.log("Listening on port " + port);
});
