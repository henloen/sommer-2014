describe('test redirection and Urls:', function() {
  

  var kjonn = ["kvinne", "mann"];
  var sivilstatus = ["gift/samboer", "skilt", "singel", "complicated"];
  var alder = ["youngster","coolcat", "hipster", "gammelringrev"];
  var hodet = ["caps","turban","hette","hjelm","solbriller","hijab"];
  var studiested = ["ntnu","selvlaertrover","annet"];
  var programmeringsstil = ["batenblirtil","detordnerseg","ordenungmusssein"];
  var musikk = ["indie","trash","disco","tronderrock","metal","rave","klassisk"];
  var personlighet = ["introvert", "ekstrovert", "ekstrovertpluss"];
  var hypepreferanse = ["bigdata", "internetofthings","laerkidsakoding"];
  var planerforkvelden = ["endresivilstatus","smiskemedsjefen","mingle","kode","nytelivet"];
  var favorittgode = ["fribar","gadgetkonto","kurskonferanse","frikantine","pensjon"];
  var premiehvisduvinner = ["moto360", "oculusrift"];



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


     //fills out answers, randomly    
    browser.findElement(by.name(getRandom(kjonn))).click();
    browser.findElement(by.name(getRandom(sivilstatus))).click();
    browser.findElement(by.name(getRandom(alder))).click();
    browser.findElement(by.name(getRandom(hodet))).click();
    browser.findElement(by.name(getRandom(studiested))).click();
    browser.findElement(by.name(getRandom(programmeringsstil))).click();
    browser.findElement(by.name(getRandom(musikk))).click();
    browser.findElement(by.name(getRandom(personlighet))).click();
    browser.findElement(by.name(getRandom(hypepreferanse))).click();
    browser.findElement(by.name(getRandom(planerforkvelden))).click();
    browser.findElement(by.name(getRandom(favorittgode))).click();
    browser.findElement(by.name(getRandom(premiehvisduvinner))).click();
    
	  browser.findElement(by.name("registerButton")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-register-participant");   	

   	browser.findElement(by.name("escapeButton")).click();
   	expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/partial-index");   	
	});

  function getRandom(list) {
        return list[Math.floor((Math.random() * list.length))];
    }

});