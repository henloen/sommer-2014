
var user = require("./user");

var authorization = require("./authorization");

// Routing:

module.exports = function(app) {

	//test.authorize('hei','yer','asdf');

//used for default route
	app.route("/")
		//.get(authorization.authorize, user.index);
		.get(user.index);

	app.route("/answers")
		//used to access answers in json format
		//.get(authorization.authorize, user.getAnswers)
		.get(user.getAnswers)
		
		//used to insert answers into database
		//.post(authorization.authorize, user.insertAnswer)
		.post(user.insertAnswer)
		
		//used to truncate table in database
		//.delete(authorization.authorize, user.deleteAnswers);
		.delete(user.deleteAnswers);


	app.route("/answers/:id")
		//used to get the answer with that id
		//.get(authorization.authorize, user.getAnswer)
		.get(user.getAnswer)
		
		//used to update the status of an answer with the id as parameter
		//.put(authorization.authorize, user.updateAnswerStatus);
		.put(user.updateAnswerStatus);

	app.route("/participants")
		//used to access all the participants in json format
		//.get(authorization.authorize, user.getParticipants)
		.get(user.getParticipants)
		
		//used to insert a participant into the database
		//.post(authorization.authorize, user.insertParticipant)
		.post(user.insertParticipant)
		
		//used to truncate table in database
		//.delete(authorization.authorize, user.deleteParticipants);
		.delete(user.deleteParticipants);

	app.route("/toggleLockAnswer/:id")
		//used to toggle the lock field of the answer in the database
		//.put(authorization.authorize, user.toggleLockAnswer);
		.put(user.toggleLockAnswer);
}