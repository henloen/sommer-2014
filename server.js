/*jshint node: true*/
"use strict";

//the modules used
var express = require("express");
var bodyParser = require("body-parser");
var router = require("./app/router");

var app = express();

//the port defined
var port = 3000;

//use of middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//serving the '/public' folder static
app.use('/public', express.static(__dirname + '/public'));

//using the router defined in router.js
router(app);

//starting the app and listen on the port defined
var server = app.listen(port, function() {
	console.log("Listening on port " + port);
});
