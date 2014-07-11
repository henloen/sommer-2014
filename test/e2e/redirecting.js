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

     //fill out answers, needed to pass activate the button for registering the answer
    var kjonn = browser.findElement(by.id("kjonn"));
    kjonn.findElement(by.name("kvinne")).click();
    

    var sivilstatus = browser.findElement(by.id("sivilstatus"));
    sivilstatus.findElement(by.name("singel")).click();
    

    var alder = browser.findElement(by.id("alder"));
    alder.findElement(by.name("hipster")).click();
    

    var pahodet = browser.findElement(by.id("pa_hodet"));
    pahodet.findElement(by.name("hette")).click();
    

    var studiested = browser.findElement(by.id("studiested"));
    studiested.findElement(by.name("ntnu")).click();
    

    var programmeringsstil = browser.findElement(by.id("programmeringsstil"));
    programmeringsstil.findElement(by.name("detordnerseg")).click();
    

    var musikk = browser.findElement(by.id("musikk"));
    musikk.findElement(by.name("disco")).click();
    

    var personlighet = browser.findElement(by.id("personlighet"));
    personlighet.findElement(by.name("ekstrovertpluss")).click();
    

    var hypepreferanse = browser.findElement(by.id("hypepreferanse"));
    hypepreferanse.findElement(by.name("bigdata")).click();
    

    var planerforkvelden = browser.findElement(by.id("planerforkvelden"));
    planerforkvelden.findElement(by.name("mingle")).click();
    
    var favorittgode = browser.findElement(by.id("favorittgode"));
    favorittgode.findElement(by.name("fribar")).click();
    
    var premie = browser.findElement(by.id("premiehvisduvinner"));
    premie.findElement(by.name("oculusrift")).click();


	 browser.findElement(by.name("registerButton")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-register-participant");   	


   	browser.findElement(by.name("escapeButton")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-start");   	

	});
});