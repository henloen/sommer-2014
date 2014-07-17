var util = require("./utilities");

describe('register answer:', function() {
    
  var baseURL = "http://localhost:3000";

  it('should not redirect when pressing "register" button when all questions are not answered', function() {
    
    util.directToIndex(browser);
    util.clickToAnswerPage(browser);
    
    util.fillNotValidAnswer(browser);
    util.submitAnswers(browser);
    //URL does not change because form is not completed
    expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/index.html#/partial-register-answer");
  });


  it('should redirect when pressing "register" button when all questions are answered', function() {
    util.fillLastQuestion(browser);
    util.submitAnswers(browser);
    
    //URL does change because form is completed
    expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/index.html#/partial-register-participant");
  });

});