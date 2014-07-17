var util = require("./utilities");

describe('test title of pages:', function() {
  
    var timestamp = (new Date).getTime();

  it('should confirm correct title on all pages', function() {
    
    util.directToIndex(browser);
    expect(browser.getTitle()).toEqual("The Beauty of Data");

    util.seeAllAnswers(browser);
    expect(browser.getTitle()).toEqual("The Beauty of Data")
  
    util.clickMenuButton(browser);
    util.clickRegisterAnswerButton(browser);
    expect(browser.getTitle()).toEqual("The Beauty of Data")

    util.clickStartButton(browser);
    expect(browser.getTitle()).toEqual("The Beauty of Data")

    util.fillAnswer(browser);
    util.submitAnswers(browser);
    expect(browser.getTitle()).toEqual("The Beauty of Data")

    util.registerParticipant(browser, timestamp);
    util.submitParticipant(browser);
    expect(browser.getTitle()).toEqual("The Beauty of Data")
  });

});
