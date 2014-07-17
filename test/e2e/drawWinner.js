var methods = require("./utilities");

describe('testing draw winner:', function() {
  
  


  it("should draw a winner from participant table", function(){

    browser.get('/');
    browser.findElement(by.name("seeAllParticipants")).click();


    methods.deleteParticipants(browser);


    browser.get("/public/#/partial-register-answer");
      

    methods.fillAnswer(browser);
    browser.findElement(by.name("registerButton")).click();
      
    methods.registerParticipant(browser);
    browser.findElement(By.name("submitButton")).click();



  	browser.get("/public/#/partial-view-participants");
  	expect(element(by.binding("winner.email")).isPresent()).toBe(false);

    browser.findElement(by.name("pickWinner")).click();

    expect(element(by.binding("winner.email")).isPresent()).toBe(true);

  }); 


});