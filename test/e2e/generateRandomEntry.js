var utilities = require("./utilities");

describe('happy flow of application:', function() {
  
  it('should click through application with random entries', function() {
        utilities.getIndex(browser);
        utilities.getToAnswerPage(browser);
        utilities.fillAnswer(browser);
        utilities.submitAnswers(browser);
    });


  it('should register participant', function() {
        utilities.registerParticipant(browser);
        utilities.submitParticipant(browser);
  });
    
});