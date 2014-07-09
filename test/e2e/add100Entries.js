xdescribe('fills up database with answers', function() {
  
  it('should add i entries', function() {
    
    //partial-index
    browser.get('/');

    
    //Navigate to questions
    browser.findElement(By.name("registerAnswer")).click();
    browser.findElement(By.name("startButton")).click();


    //for dummy entries to test loading of answer-view.
    //Test will time out after 30 seconds
    for (var i=0; i < 50; i++) {
        browser.findElement(By.name("registerButton")).click();
        browser.navigate().back();
    }


  });
});