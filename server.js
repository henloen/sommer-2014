var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = 3000;
var router = require("./app/router");

var authorization = require("./app/authorization");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//****************AUTHORIZATION******************
app.use('/public', authorization.authorize)
//***********************************************


app.use('/public', express.static(__dirname + '/public'));

router(app);


var server = app.listen(port, function() {
	console.log("Listening on port " + port);
});
