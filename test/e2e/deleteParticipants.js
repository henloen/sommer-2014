describe('participants database:', function() {
  
  it('should delete participants in table', function() {
    
    //partial-index
    browser.get('/');
    browser.findElement(by.name("seeAllParticipants")).click();

    //Delete all existing entries in participants
    browser.findElement(by.name("deleteParticipants")).click();
    browser.findElement(by.name("confirmDelete")).click();

	//Checks that no elements with binding exist --> There are no entries in the participants table
    expect(element(by.exactBinding('participant.email')).isPresent()).toBe(false);
	});
});