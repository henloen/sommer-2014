
/*

************************************************************
NOT TESTED AS VALIDATION IMPLEMENTATION IS NOT FINISHED!!!
COMMENTED OUT UNTIL IMPLEMENTED
************************************************************

*/

xdescribe('register answer:', function() {
  
    browser.get('/');
    browser.findElement(by.name("registerAnswer")).click();
    browser.findElement(by.name("startButton")).click();  


  it('should hide "register" button when all questions are not answered', function() {    
    //Verifies that button can't be pressed when form is not valid
    expect(element(by.name('registerButton')).getAttribute('disabled')).toBeTruthy();
  	});



  it('should show "register" button when all questions are answered', function() {
    
    //fill out answers
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
    
    var premie = browser.findElement(by.id("premie"));
    premie.findElement(by.name("oculusrift")).click();


    //Verifies that button can be pressed when form is valid
    expect(element(by.name('submitButton')).getAttribute('disabled')).toBeFalsy();

  });
});