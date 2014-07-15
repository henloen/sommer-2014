
var user = require("./user");

var authorization = require("./authorization");

// Routing:

module.exports = function(app) {

	//test.authorize('hei','yer','asdf');

//used for default route
	app.route("/")
		.get(authorization.authorize, user.index);

	app.route("/answers")
		//used to access answers in json format
		.get(authorization.authorize, user.getAnswers)
		//used to insert answers into database
		.post(authorization.authorize, user.insertAnswer)
		//used to truncate table in database
		.delete(authorization.authorize, user.deleteAnswers);


	app.route("/answers/:id")
		//used to get the answer with that id
		.get(authorization.authorize, user.getAnswer)
		//used to update the status of an answer with the id as parameter
		.put(authorization.authorize, user.updateAnswerStatus);

	app.route("/participants")
		//used to access all the participants in json format
		.get(authorization.authorize, user.getParticipants)
		//used to insert a participant into the database
		.post(authorization.authorize, user.insertParticipant)
		//used to truncate table in database
		.delete(authorization.authorize, user.deleteParticipants);

	app.route("/toggleLockAnswer/:id")
		//used to toggle the lock field of the answer in the database
		.put(authorization.authorize, user.toggleLockAnswer);
}