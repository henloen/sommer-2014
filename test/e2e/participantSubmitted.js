var util = require("./utilities");

describe('adding new participant to database table:', function() {
  
  it("should verify that the participant table is truncated", function(){

    util.directToIndex(browser);
    util.seeAllParticipants(browser);

    util.deleteParticipants(browser);
    
    //Checks that no elements with binding exist --> There are no entries in the answers table
  	expect(element(by.binding('participant.email')).isPresent()).toBe(false);
  });


  it("should add a new answer", function() {
  	
    util.directToRegisterAnswer(browser);
    util.fillAnswer(browser);
    util.submitAnswers(browser);
  });


  it('should register participant', function() {
    
    util.registerParticipant(browser);
    util.submitParticipant(browser);
  });


  it("should verify new participant in participant table", function(){
  	util.directToViewParticipants(browser);
  	expect(element(by.binding('participant.email')).isPresent()).toBe(true);
  }); 

});