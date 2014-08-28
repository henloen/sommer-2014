/*jshint node:true*/
"use strict";

//Access the methods exported from user.js
var user = require("./user");



//Routing:

module.exports = function(app) {

//default route
	app.route("/")
		.get(user.index);

/*
route for accessing multiple answers or create a new answer
supports GET, POST, DELETE
*/
	app.route("/answers")
		//used to get all answers in json format
		.get(user.getAnswers)
		
		//used to insert a new answer
		.post(user.insertAnswer)
		
		//used to truncate the table containing the answers
		.delete(user.deleteAnswers);
		
/*
route for accessing multiple answers and visualize them
supports GET
*/		
	app.route("/visualize").get(user.getAnswers);

/*
route for accessing specific answers based on the id provided as parameter
supports GET, PUT, DELETE
*/
	app.route("/answers/:id")
		//used to get the answer with the specified id
		.get(user.getAnswer)
		
		//used to change the status of the answer with the specified id
		.put(user.toggleProcessedAnswer)

		//used to delete the answer with the specified id
		.delete(user.deleteAnswer);

/*
route for locking the answer with the specified id, changes the 'locked' field of the answer with the specified id.
could perhaps used the put option of /answers/:id for both toggling the 'processed' and the 'locked' field for a cleaner REST API,
but this is the solution used as of now.
*/
	app.route("/toggleLockAnswer/:id")
		.put(user.toggleLockAnswer);

/*
route for accessing multiple participants
supports GET, POST, DELETE
*/
	app.route("/participants")
		//used to get all participants in json format
		.get(user.getParticipants)
		
		//used to insert a new participant
		.post(user.insertParticipant)
		
		//used to truncate the table containing participants
		.delete(user.deleteParticipants);

/*
route for creating a winner with the specified email/contact info as primary key
actually changes the 'winner' field of the participant with that primary key from 0 to 1, but for the user it 'creates' a winner
*/
	app.route("/winners/:email")
		.post(user.updateWinner);

/*
route for deleting all winners, sets the 'winner' field of all participants to 0, but for the user is 'deletes' all winners
*/
	app.route("/winners")
		//used to reset all fields indicating winners
		.delete(user.deleteWinners);

	app.route("/exportAnswers")
		.get(user.exportAnswers);

	app.route("/exportParticipants")
		.get(user.exportParticipants);
};