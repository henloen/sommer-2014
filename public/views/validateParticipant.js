
/*

************************************************************
//NOT TESTED AS VALIDATION IMPLEMENTATION IS NOT FINISHED!!!
************************************************************

*/
xdescribe('register participant:', function() {
  
    var milliseconds = (new Date).getTime();
    browser.get('/');
    browser.findElement(by.name("registerAnswer")).click();

    browser.findElement(by.name("startButton")).click();
    browser.findElement(by.name("registerButton")).click();
  


  it('should hide "register" button when form is not valid', function() {    
    //Verifies that button can't be pressed when form is not valid
    expect(element(by.name('submitButton')).getAttribute('disabled')).toBeTruthy();
  	});


  it('should show "register" button when form is valid', function() {
    browser.findElement(By.name("participantName")).sendKeys("validation");
    browser.findElement(By.name("participantEmail")).sendKeys("validating" + milliseconds +"@participant.no");
    browser.findElement(By.name("submitButton")).click();

    //Verifies that button can be pressed when form is valid
    expect(element(by.name('submitButton')).getAttribute('disabled')).toBeFalsy();
  });
});