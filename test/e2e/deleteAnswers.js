describe('test answer database:', function() {
  
  it('should delete entries in database', function() {
    
    //partial-index
    browser.get('/');

    browser.findElement(by.name("seeAllAnswers")).click();


    browser.findElement(by.name("deleteAnswers")).click();
    browser.findElement(by.name("confirmDelete")).click();


/*
    HAS TO VERIFY THAT DATABASE ENTRIES ARE ACTUALLY DELETED!!
*/

	});
});