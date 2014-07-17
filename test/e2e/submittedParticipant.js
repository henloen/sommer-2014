describe('adding new participant to database table:', function() {
  

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

  it("should verify that the participant table is truncated", function(){

  	browser.get('/');
    browser.findElement(by.name("seeAllParticipants")).click();

    //Delete all existing entries in answers
    browser.findElement(by.name("deleteParticipants")).click();
    browser.findElement(by.name("confirmDelete")).click();

    //Checks that no elements with binding exist --> There are no entries in the answers table
  	expect(element(by.binding('participant.email')).isPresent()).toBe(false);
  });


  it("should add a new answer", function() {
  	browser.get("/public/#/partial-register-answer");
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
  });



  it('should register participant', function() {
        browser.findElement(By.name("participantName")).sendKeys("test");
        browser.findElement(By.name("participantEmail")).sendKeys("test" + milliseconds +"@happyflow.no");
        browser.findElement(By.name("submitButton")).click();
  });



  it("should verify new participant in participant table", function(){
  	browser.get("/public/#/partial-view-participants");
  	expect(element(by.binding('participant.email')).isPresent()).toBe(true);
  }); 



function getRandom(list) {
        return list[Math.floor((Math.random() * list.length))];
    }

});