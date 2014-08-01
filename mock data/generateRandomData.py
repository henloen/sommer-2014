import MySQLdb
import random

answers = [
    ["mann", "kvinne"],
    ["gift/samboer", "skilt", "singel", "complicated"],
    ["master", "bachelor", "selvstudertrover", "annet"],
    ["batenblirtil", "detordnerseg", "ordenungmusssein", "quickanddirty"],
    ["introvert", "ekstrovert", "ekstrovertpluss"],
    ["bigdata", "internetofthings", "laerkidsakoding", "microservices"],
    ["rock","vglista","disco","tronderrock","metal","rave","klassisk", "alternativ"],
    ["youngster", "coolcat", "hipster", "gammelringrev", "nerd"],
    ["fribar", "gadetkonto", "kurskonferanse", "frikantine", "pensjon"],
    ["endresivilstatus", "smiskemedsjefen", "mingle", "kode", "nytelivet"]
    ]

def insertMockAnswers(numberOfRows):
    for i in range(numberOfRows):
        insertRandomAnswer()
    print("inserted " + str(numberOfRows) + " answers")

def insertMockParticipants(numberOfParts):
    for i in range(numberOfParts):
        insertRandomParticipant(i)
    print("inserted " + str(numberOfParts) + " participants")

def insertRandomAnswer():
    values = ['singel', 'hette', 'hipster', 'ntnu', 'detordnerseg','disco','ekstrovert','bigdata','fribar','mingle','moto360','mann']
    randomValues = pickOptions(answers)
    insertStatementAnswers(randomValues)

def insertRandomParticipant(i):
    values = ['email' + str(i) + '@test.no', 'testuser' + str(i)]
    insertStatementParticipants(values)

def insertStatementAnswers(values):
    cursor.execute("insert into bod.answers(kjonn, sivilstatus, utdannelse, \
		programmeringsstil, personlighet, hypepreferanse, musikk, type, favorittgode, \
		planerforkvelden, processed)" +
                   "values('" + values[0] +"', '" + values[1] +"', '" + values[2]
		 +"', '" + values[3] +"', '" + values[4] +"', '" + values[5]
		  +"', '" + values[6] +"', '" + values[7]  +"', '" + values[8]
		   +"', '" + values[9] + "', 0);")

def insertStatementParticipants(values):
    cursor.execute("insert into bod.participants(email, name)" + 
    "values ('" + values[0] + "', '" + values[1] + "');")

def pickOptions(doubleArray):
    randomArray = []
    for array in doubleArray:
        randomArray.append(pickOption(array))
    return randomArray

def pickOption(array):
    return array[random.randint(0, len(array)-1)]

connection = MySQLdb.connect (host = "10.1.102.26", user="root", passwd="test")

cursor = connection.cursor()

try:
    insertMockAnswers(204)
    insertMockParticipants(232)
    connection.commit()
except Exception, e:
    print (e)
    print("rollback")
    connection.rollback()


cursor.close()

connection.close()
