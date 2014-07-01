var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var port = 3000;

var user = require("./public/js/user");

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());


// Routing:

//used for default route
app.get("/", user.index);

//used to access data in json format
app.get("/readAnswers", user.readAllAnswers);

//used to get one particular answer
app.get("/readAnswers/:id", user.getAnswer);

//used to insert answers into database
app.post("/insertAnswerDb", user.insertAnswerDb);

//used to truncate table in database
app.get("/deleteAnswers", user.deleteAnswers);

//used to insert a participant into the database
app.post("/insertParticipant", user.insertParticipant);

//used to access all the participants in json format
app.get("/getParticipants", user.getParticipants);

//used to truncate table in database
app.get("/deleteParticipants", user.deleteParticipants);

//
app.post("/updateAnswerStatus/:id", user.updateAnswerStatus);

app.get("/toggleLockAnswer/:id", user.toggleLockAnswer);

var server = app.listen(port, function() {
	console.log("Listening on port " + port);
});
