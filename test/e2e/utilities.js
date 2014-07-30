   
var kjonn = ["kvinne", "mann"];
var sivilstatus = ["gift/samboer", "skilt", "singel", "complicated"];
var type = ["youngster","coolcat", "hipster", "gammelringrev", "nerd"];
var hodet = ["caps","turban","hette","hjelm","solbriller","hijab"];
var studiested = ["ntnu","selvlaertrover","annet"];
var programmeringsstil = ["batenblirtil","detordnerseg","ordenungmusssein", "quickanddirty"];
var musikk = ["rock","vglista","disco","tronderrock","metal","rave","klassisk", "alternativ"];
var personlighet = ["introvert", "ekstrovert", "ekstrovertpluss"];
var hypepreferanse = ["bigdata", "internetofthings","laerkidsakoding"];
var planerforkvelden = ["endresivilstatus","smiskemedsjefen","mingle","kode","nytelivet"];
var favorittgode = ["fribar","gadgetkonto","kurskonferanse","frikantine","pensjon"];
var premiehvisduvinner = ["moto360", "oculusrift", "blomster", "fruktkurv"];

var milliseconds = (new Date).getTime();





/********************************
URLs
********************************/

function directToIndex(browser) {
    browser.get('/');
}

function directToPublic(browser) {
    browser.get('/public');
}

function directToViewAnswers(browser) {
    browser.get("/#/partial-view-answers");
}

function directToRegisterAnswer(browser) {
    browser.get("/public/#/partial-register-answer");
}

function directToViewParticipants(browser) {
    browser.get("/public/#/partial-view-participants");
}




/*******************************
Click on buttons
*******************************/

function seeAllAnswers(browser) {
    browser.findElement(by.name("seeAllAnswers")).click();
}

function clickRegisterAnswerButton(browser) {
    browser.findElement(by.name("registerAnswer")).click();
}

function seeAllParticipants(browser) {
    browser.findElement(by.name("seeAllParticipants")).click();
}




function clickToAnswerPage(browser) {
    clickRegisterAnswerButton(browser);
    clickStartButton(browser);
}

function clickStartButton(browser) {
    browser.findElement(by.name("startButton")).click();
}

function clickMenuButton(browser) {
    browser.findElement(by.name("menuButton")).click();
}

function clickEscapeButton(browser) {
    browser.findElement(by.name("escapeButton")).click();
}










function fillAnswer(browser) {
	browser.findElement(by.name(getRandomWithinLength(kjonn))).click();
    browser.findElement(by.name(getRandomWithinLength(sivilstatus))).click();
    browser.findElement(by.name(getRandomWithinLength(type))).click();
    browser.findElement(by.name(getRandomWithinLength(hodet))).click();
    browser.findElement(by.name(getRandomWithinLength(studiested))).click();
    browser.findElement(by.name(getRandomWithinLength(programmeringsstil))).click();
    browser.findElement(by.name(getRandomWithinLength(musikk))).click();
    browser.findElement(by.name(getRandomWithinLength(personlighet))).click();
    browser.findElement(by.name(getRandomWithinLength(hypepreferanse))).click();
    browser.findElement(by.name(getRandomWithinLength(planerforkvelden))).click();
    browser.findElement(by.name(getRandomWithinLength(favorittgode))).click();
    browser.findElement(by.name(getRandomWithinLength(premiehvisduvinner))).click();
}

function fillNotValidAnswer(browser) {
    browser.findElement(by.name(getRandomWithinLength(kjonn))).click();
    browser.findElement(by.name(getRandomWithinLength(sivilstatus))).click();
    browser.findElement(by.name(getRandomWithinLength(type))).click();
    browser.findElement(by.name(getRandomWithinLength(hodet))).click();
    browser.findElement(by.name(getRandomWithinLength(studiested))).click();
    browser.findElement(by.name(getRandomWithinLength(programmeringsstil))).click();
    browser.findElement(by.name(getRandomWithinLength(musikk))).click();
    browser.findElement(by.name(getRandomWithinLength(personlighet))).click();
    browser.findElement(by.name(getRandomWithinLength(hypepreferanse))).click();
    browser.findElement(by.name(getRandomWithinLength(planerforkvelden))).click();
    browser.findElement(by.name(getRandomWithinLength(favorittgode))).click();
}

function fillLastQuestion(browser) {
    browser.findElement(by.name(getRandomWithinLength(premiehvisduvinner))).click();
}


function submitAnswers(browser) {
    browser.findElement(by.name("registerButton")).click();
}

function registerParticipant(browser, timestamp) {
    browser.findElement(By.name("participantName")).sendKeys("test");
    browser.findElement(By.name("participantEmail")).sendKeys("test" + timestamp +"@testing.no");
    browser.findElement(by.name(getRandomWithinLength(premiehvisduvinner))).click();
}

function submitParticipant(browser) {
    browser.findElement(By.name("submitButton")).click();
}

function deleteAnswers(browser) {
    browser.findElement(by.name("deleteAnswers")).click();
    browser.findElement(by.name("confirmDelete")).click();
}

function pickWinner(browser) {
    browser.findElement(by.name("pickWinner")).click();
}

function deleteParticipants(browser) {
    browser.findElement(by.name("deleteParticipants")).click();
    browser.findElement(by.name("confirmDelete")).click();
}


function getRandomWithinLength(list) {
    return list[Math.floor((Math.random() * list.length))];
}





exports.directToIndex = directToIndex;
exports.directToPublic = directToPublic;
exports.directToViewAnswers = directToViewAnswers;
exports.directToRegisterAnswer = directToRegisterAnswer;
exports.directToViewParticipants = directToViewParticipants;


exports.seeAllAnswers = seeAllAnswers;
exports.clickRegisterAnswerButton = clickRegisterAnswerButton;
exports.seeAllParticipants = seeAllParticipants;

exports.clickStartButton = clickStartButton;
exports.clickToAnswerPage = clickToAnswerPage;
exports.clickMenuButton = clickMenuButton;
exports.clickEscapeButton = clickEscapeButton;

exports.fillAnswer = fillAnswer;
exports.fillNotValidAnswer = fillNotValidAnswer;
exports.fillLastQuestion = fillLastQuestion;
exports.submitAnswers = submitAnswers;

exports.registerParticipant = registerParticipant;
exports.submitParticipant = submitParticipant;

exports.deleteAnswers = deleteAnswers;

exports.deleteParticipants = deleteParticipants;
exports.pickWinner = pickWinner;