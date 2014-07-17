describe('register participant:', function() {
  
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

    browser.get('/');
    browser.findElement(by.name("registerAnswer")).click();
    browser.findElement(by.name("startButton")).click();

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
  

  it('should hide "register" button when form is not valid', function() {    
    //Verifies that button can't be pressed when form is not valid
    expect(element(by.name('submitButton')).getAttribute('disabled')).toBeTruthy();
  	});


  it('should show "register" button when form is valid', function() {
    browser.findElement(By.name("participantName")).sendKeys("validation");
    browser.findElement(By.name("participantEmail")).sendKeys("validating" + milliseconds +"@participant.no");
    
    expect(element(by.name('submitButton')).getAttribute('disabled')).toBeFalsy();
  });



  function getRandom(list) {
        return list[Math.floor((Math.random() * list.length))];
    }

});