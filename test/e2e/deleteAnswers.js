describe('answer database:', function() {
  
  it('should delete answers in table', function() {
    
    //partial-index
    browser.get('/');
    browser.findElement(by.name("seeAllAnswers")).click();

    //Delete all existing entries in answers
    browser.findElement(by.name("deleteAnswers")).click();
    browser.findElement(by.name("confirmDelete")).click();

    //Checks that no elements with binding exist --> There are no entries in the answers table
  	expect(element(by.exactBinding('answer.id_answers')).isPresent()).toBe(false);
	});
});