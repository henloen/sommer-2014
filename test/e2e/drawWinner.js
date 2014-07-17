var util = require("./utilities");

describe('testing draw winner:', function() {

  var timestamp = (new Date).getTime();

  it("should draw a winner from participant table", function(){

    util.directToIndex(browser);
   
    util.seeAllParticipants(browser);
    util.deleteParticipants(browser);

    util.directToRegisterAnswer(browser);
    util.fillAnswer(browser);
    util.submitAnswers(browser);
      
    util.registerParticipant(browser, timestamp);
    util.submitParticipant(browser);

  	util.directToViewParticipants(browser);

  	expect(element(by.binding("winner.email")).isPresent()).toBe(false);
    util.pickWinner(browser);
    expect(element(by.binding("winner.email")).isPresent()).toBe(true);
  }); 

});

