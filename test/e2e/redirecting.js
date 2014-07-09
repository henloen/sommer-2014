describe('test redirection and Urls:', function() {
  
  it('should redirect page to correct Url when navigating', function() {
    
    
  	//Does not register participant, but verifies all other links

    browser.get('/');
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/index.html#/partial-index");


   	browser.get('/public');
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-index");


   	browser.findElement(by.name("seeAllAnswers")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-view-answers");
 

 	  browser.findElement(by.name("menuButton")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-index");


   	browser.findElement(by.name("seeAllParticipants")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-view-participants");


   	browser.findElement(by.name("menuButton")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-index");


   	browser.findElement(by.name("registerAnswer")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-start");


  	browser.findElement(by.name("startButton")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-register-answer");


	 browser.findElement(by.name("registerButton")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/index.html#/partial-register-participant");   	


   	browser.findElement(by.name("escapeButton")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/index.html#/partial-start");   	

	});
});