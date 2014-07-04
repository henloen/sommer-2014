
var user = require("./user");

// Routing:

module.exports = function(app) {

//used for default route
	app.route("/")
		.get(user.index);

	app.route("/answers")
		//used to access answers in json format
		.get(user.getAnswers)
		//used to insert answers into database
		.post(user.insertAnswer)
		//used to truncate table in database
		.delete(user.deleteAnswers);


	app.route("/answers/:id")
		//used to get the answer with that id
		.get(user.getAnswer)
		//used to update the status of an answer with the id as parameter
		.put(user.updateAnswerStatus);

	app.route("/participants")
		//used to access all the participants in json format
		.get(user.getParticipants)
		//used to insert a participant into the database
		.post(user.insertParticipant)
		//used to truncate table in database
		.delete(user.deleteParticipants);

	app.route("/toggleLockAnswer/:id")
		//used to toggle the lock field of the answer in the database
		.put(user.toggleLockAnswer);
}