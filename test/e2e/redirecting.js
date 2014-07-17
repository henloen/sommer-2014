var util = require("./utilities");

describe('test redirection and Urls:', function() {
  
  var baseURL = "http://localhost:3000";

  it('should redirect page to correct Url when navigating', function() {
    
  	//Does not register participant, but verifies all other links

    util.directToIndex(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/index.html#/partial-index");

    util.directToPublic(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/#/partial-index");

    util.seeAllAnswers(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/#/partial-view-answers");

 	  util.clickMenuButton(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/#/partial-index");

   	util.seeAllParticipants(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/#/partial-view-participants");

    util.clickMenuButton(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/#/partial-index");

    util.clickRegisterAnswerButton(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/#/partial-start");

    util.clickStartButton(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/#/partial-register-answer");

    util.fillAnswer(browser);    
    util.submitAnswers(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/#/partial-register-participant");   	

   	util.clickEscapeButton(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/#/partial-index");   	
	});

});