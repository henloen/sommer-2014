xdescribe('fills up database with answers', function() {
  
    //************************************************
    //very unstable test. Doesn't always wait for page
    //************************************************
  it('should add i entries', function() {
    
    //partial-index
    browser.get('/');

    
    //Navigate to questions
    browser.findElement(By.name("registerAnswer")).click();
    browser.findElement(By.name("startButton")).click();


    //for dummy entries to test loading of answer-view.
    //Test will time out after 30 seconds
    for (var i=0; i < 100; i++) {
        browser.findElement(By.name("registerButton")).click();
        browser.sleep(10);
        browser.navigate().back();
        browser.sleep(10);
    }


  });
});