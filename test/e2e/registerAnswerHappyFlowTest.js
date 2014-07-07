describe('happy flow of application, with registering:', function() {
  
  it('should test application flow', function() {
    
    //partial-index
    browser.get('/');
   

    
    browser.findElement(by.name("registerAnswer")).click();
    browser.findElement(by.name("startButton")).click();
    


    
    var kjonn = browser.findElement(by.id("kjonn"));
    kjonn.findElement(by.name("kvinne")).click();
    browser.sleep(50);

    var sivilstatus = browser.findElement(by.id("sivilstatus"));
    sivilstatus.findElement(by.name("singel")).click();
    browser.sleep(50);

    var alder = browser.findElement(by.id("alder"));
    alder.findElement(by.name("hipster")).click();
    browser.sleep(50);

    var pahodet = browser.findElement(by.id("pa_hodet"));
    pahodet.findElement(by.name("hette")).click();
    browser.sleep(50);

    var studiested = browser.findElement(by.id("studiested"));
    studiested.findElement(by.name("ntnu")).click();
    browser.sleep(50);

    browser.sleep(200);


    browser.findElement(by.name("registerButton")).click();
    



    //partial-register-participant
 /*   var milliseconds = (new Date).getTime();
    browser.findElement(By.name("participantName")).sendKeys("test");
    browser.findElement(By.name("participantEmail")).sendKeys("test" + milliseconds +"@lars.no");
    browser.findElement(By.name("submitButton")).click();
  */  



  });
});