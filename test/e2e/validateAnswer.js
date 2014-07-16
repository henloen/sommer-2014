describe('register answer:', function() {
    
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



  it('should not redirect when pressing "register" button when all questions are not answered', function() {
    browser.get('/');
    browser.findElement(by.name("registerAnswer")).click();
    browser.findElement(by.name("startButton")).click();  
    
    //fill out answers
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

    browser.findElement(by.name("registerButton")).click();

    //URL does not change because form is not completed
    expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/index.html#/partial-register-answer");
  });


  it('should redirect when pressing "register" button when all questions are answered', function() {
    
    browser.findElement(by.name(getRandom(premiehvisduvinner))).click();
    browser.findElement(by.name("registerButton")).click();
    
    //URL does change because form is completed
    expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/index.html#/partial-register-participant")
  });



  function getRandom(list) {
        return list[Math.floor((Math.random() * list.length))];
    }

});