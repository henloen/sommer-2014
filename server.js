var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var port = 3000;

var user = require("./public/js/user");

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());


// Routing:

//used to access data in json format
app.get("/readAnswers", user.readAllAnswers);

//used to insert answers into database
app.post("/insertAnswerDb", user.insertAnswerDb);

//used to truncate table in database
app.get("/deleteAll", user.deleteAll);

var server = app.listen(port, function() {
	console.log("Listening on port " + port);
});
