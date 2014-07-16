describe('test titles of pages', function() {
  

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

    var milliseconds = (new Date).getTime();

  it('should confirm correct title on all pages', function() {
    
    //partial-index
    browser.get('/');
    expect(browser.getTitle()).toEqual("The Beauty of Data");

    //partial-view-answers
    browser.findElement(By.name("seeAllAnswers")).click();
    expect(browser.getTitle()).toEqual("The Beauty of Data")
  
    //partial-start
    browser.findElement(By.name("menuButton")).click();
    browser.findElement(By.name("registerAnswer")).click();
    expect(browser.getTitle()).toEqual("The Beauty of Data")

    //partial-register-answer
    browser.findElement(By.name("startButton")).click();
    expect(browser.getTitle()).toEqual("The Beauty of Data")


    //partial-register-participant
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
    browser.findElement(by.name(getRandom(premiehvisduvinner))).click();

    browser.findElement(By.name("registerButton")).click();
    expect(browser.getTitle()).toEqual("The Beauty of Data")

    //partial-register-participant
    browser.findElement(By.name("participantName")).sendKeys("test");
    browser.findElement(By.name("participantEmail")).sendKeys("test" + milliseconds +"@lars.no");
    browser.findElement(By.name("submitButton")).click();
    expect(browser.getTitle()).toEqual("The Beauty of Data")

  });


    function getRandom(list) {
        return list[Math.floor((Math.random() * list.length))];
    }

});
