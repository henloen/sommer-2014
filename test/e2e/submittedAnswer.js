var util = require("./utilities");

describe('adding new answer to database table:', function() {
  

  it("should verify that the table is truncated", function(){

    util.directToIndex(browser);
    util.seeAllAnswers(browser);

    util.deleteAnswers(browser);

    //Checks that no elements with binding exist --> There are no entries in the answers table
  	expect(element(by.binding('answer.id_answers')).isPresent()).toBe(false);
  });


  it("should add a new answer", function() {

    util.directToRegisterAnswer(browser);
    util.fillAnswer(browser);
    util.submitAnswers(browser);
  });


  it("should verify new answer in answer table", function(){
  	
    util.directToViewAnswers(browser);
  	expect(element(by.binding('answer.id_answers')).isPresent()).toBe(true);
  }); 

});


//***********************************************************************
// Sjekke at submitted svar stemmer med det som er registrert i databasen
//***********************************************************************