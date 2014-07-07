'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('bodApp.controllers'));
  beforeEach(module('bodApp.services'));


  it('should ....', inject(function($controller) {
    //spec body
    var answerCtrl = $controller('AnswerCtrl', { $scope: {} });
    expect(answerCtrl).toBeDefined();
  }));

  it('should ....', inject(function($controller) {
    //spec body
    var participantsCtrl = $controller('ParticipantsCtrl', { $scope: {} });
    expect(participantsCtrl).toBeDefined();
  }));
});
