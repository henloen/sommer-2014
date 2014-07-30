var util = require("./utilities");

describe('should test restrictions towards email database:', function() {
  
  var baseURL = "http://localhost:3000";
  var timestamp = (new Date).getTime();

  it('should allow entry of email', function() {    
    util.directToIndex(browser);
    util.clickRegisterAnswerButton(browser);
    util.clickStartButton(browser);
    util.fillAnswer(browser);
    util.submitAnswers(browser);

    util.registerParticipant(browser, timestamp);
    util.submitParticipant(browser);

    expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/index.html#/partial-participant-registered");
  });


  it('should deny duplicate email entry', function() {

    util.clickMenuButton(browser);
    util.clickStartButton(browser);
    util.fillAnswer(browser);
    util.submitAnswers(browser);

    util.registerParticipant(browser, timestamp);
    util.submitParticipant(browser)

    //Won't be submitted because email already exists
    expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/index.html#/partial-register-participant");
  });


});