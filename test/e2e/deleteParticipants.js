var util = require("./utilities");

describe('participants database:', function() {
  
  it('should delete participants in table', function() {
    
    //partial-index
    util.directToIndex(browser);
    util.directToViewParticipants(browser);

    util.deleteParticipants(browser);

	//Checks that no elements with binding exist --> There are no entries in the participants table
    expect(element(by.binding('participant.email')).isPresent()).toBe(false);
	});
});