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

//used to access answers in json format
app.get("/answers", user.getAnswers);

//used to insert answers into database
app.post("/answers", user.insertAnswer);

//used to truncate table in database
app.delete("/answers", user.deleteAnswers);

//used to get the answer with that id
app.get("/answers/:id", user.getAnswer);

//used to update the status of an answer with the id as parameter
app.put("/answers/:id", user.updateAnswerStatus);

//used to access all the participants in json format
app.get("/participants", user.getParticipants);

//used to insert a participant into the database
app.post("/participants", user.insertParticipant);

//used to truncate table in database
app.delete("/participants", user.deleteParticipants);

//used to toggle the lock field of the answer in the database
app.put("/toggleLockAnswer/:id", user.toggleLockAnswer);

var server = app.listen(port, function() {
	console.log("Listening on port " + port);
});
