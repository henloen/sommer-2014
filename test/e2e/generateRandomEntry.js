var util = require("./utilities");

describe('happy flow of application:', function() {

    var timestamp = (new Date).getTime();
  
  it('should click through application with random entries', function() {
        util.directToIndex(browser);
        util.clickToAnswerPage(browser);
        util.fillAnswer(browser);
        util.submitAnswers(browser);
    });


  it('should register participant', function() {
        util.registerParticipant(browser, timestamp);
        util.submitParticipant(browser);
    });
    
});