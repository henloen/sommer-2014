   
var kjonn = ["kvinne", "mann"];
var sivilstatus = ["gift/samboer", "skilt", "singel", "complicated"];
var alder = ["youngster","coolcat", "hipster", "gammelringrev"];
var hodet = ["caps","turban","hette","hjelm","solbriller","hijab"];
var studiested = ["ntnu","selvlaertrover","annet"];
var programmeringsstil = ["batenblirtil","detordnerseg","ordenungmusssein"];
var musikk = ["indie","trash","disco","tronderrock","metal","rave","klassisk"];
var personlighet = ["introvert", "ekstrovert", "ekstrovertpluss"];
var hypepreferanse = ["bigdata", "internetofthings","laerkidsakoding"];
var planerforkvelden = ["endresivilstatus","smiskemedsjefen","mingle","kode","nytelivet"];
var favorittgode = ["fribar","gadgetkonto","kurskonferanse","frikantine","pensjon"];
var premiehvisduvinner = ["moto360", "oculusrift"];

var milliseconds = (new Date).getTime();



function getIndex(browser) {
    browser.get('/');
}

function getToAnswerPage(browser) {
    browser.findElement(by.name("registerAnswer")).click();
    browser.findElement(by.name("startButton")).click();
}

function fillAnswer(browser) {
	browser.findElement(by.name(getRandom(kjonn))).click();
    browser.findElement(by.name(getRandom(sivilstatus))).click();
    browser.findElement(by.name(getRandom(alder))).click();
    browser.findElement(by.name(getRandom(hodet))).click();
    browser.findElement(by.name(getRandom(studiested))).click();
    browser.findElement(by.name(getRandom(programmeringsstil))).click();
    browser.findElement(by.name(getRandom(musikk))).click();
    browser.findElement(by.name(getRandom(personlighet))).click();
    browser.findElement(by.name(getRandom(hypepreferanse))).click();
    browser.findElement(by.name(getRandom(planerforkvelden))).click();
    browser.findElement(by.name(getRandom(favorittgode))).click();
    browser.findElement(by.name(getRandom(premiehvisduvinner))).click();
}

function submitAnswers(browser) {
    browser.findElement(by.name("registerButton")).click();
}

function registerParticipant(browser) {
    browser.findElement(By.name("participantName")).sendKeys("test");
    browser.findElement(By.name("participantEmail")).sendKeys("test" + milliseconds +"@drawWinner.no");
}

function submitParticipant(browser) {
    browser.findElement(By.name("submitButton")).click();
}

function deleteParticipants(browser) {
    browser.findElement(by.name("deleteParticipants")).click();
    browser.findElement(by.name("confirmDelete")).click();
}


function getRandom(list) {
    return list[Math.floor((Math.random() * list.length))];
}


exports.getIndex = getIndex;
exports.getToAnswerPage = getToAnswerPage;
exports.fillAnswer = fillAnswer;
exports.registerParticipant = registerParticipant;
exports.submitParticipant = submitParticipant;
exports.deleteParticipants = deleteParticipants;
exports.submitAnswers = submitAnswers;