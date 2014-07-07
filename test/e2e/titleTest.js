

describe('test titles of pages', function() {
  
  it('correct title on all pages', function() {
    
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
    browser.findElement(By.name("registerButton")).click();
    expect(browser.getTitle()).toEqual("The Beauty of Data")



    //partial-register-participant
    var milliseconds = (new Date).getTime();
    browser.findElement(By.name("participantName")).sendKeys("test");
    browser.findElement(By.name("participantEmail")).sendKeys("test" + milliseconds +"@lars.no");
    browser.findElement(By.name("submitButton")).click();
    expect(browser.getTitle()).toEqual("The Beauty of Data")



  });
});
