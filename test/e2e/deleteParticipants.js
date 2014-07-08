describe('test participants database:', function() {
  
  it('should delete participants in database', function() {
    
    //partial-index
    browser.get('/');

    browser.findElement(by.name("seeAllParticipants")).click();


    browser.findElement(by.name("deleteParticipants")).click();
    browser.findElement(by.name("confirmDelete")).click();


/*
    HAS TO VERIFY THAT DATABASE PARTICIPANTS ARE ACTUALLY DELETED!!
*/

	});
});