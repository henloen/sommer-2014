describe('happy flow of application:', function() {
  
  it('should click through application with default entries', function() {
    
    //partial-index
    browser.get('/');
   

    
    browser.findElement(by.name("registerAnswer")).click();
    browser.findElement(by.name("startButton")).click();
    



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
    
    var premie = browser.findElement(by.id("premiehvisduvinner"));
    premie.findElement(by.name("oculusrift")).click();
    

    browser.findElement(by.name("registerButton")).click();



    //partial-register-participant
    var milliseconds = (new Date).getTime();
    browser.findElement(By.name("participantName")).sendKeys("test");
    browser.findElement(By.name("participantEmail")).sendKeys("test" + milliseconds +"@happyflow.no");
    browser.findElement(By.name("submitButton")).click();
    
    });
});