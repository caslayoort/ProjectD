#!/usr/bin/python3
import sys
import json
import sys
import re
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./firebase.json")
firebase_admin.initialize_app(cred)

sys.path.append('./phone.py')
sys.path.append('./subscription.py')
sys.path.append('./recommendation.py')

import phone as phone
import subscription as sub
import recommendation as recommend

import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

def GetUUID(session):
    sessionID = session.split("/")[4]
    if '-' in sessionID:
        return False
    else:
        return sessionID

def hours(intent):
    if intent.lower() == "hour" or intent.lower() == "hours":
        return "Our store is open from 9am till 5pm."

def getResponse(intent, question, defaultAnswer, endOfConversation, uuid):
    en_stops = set(stopwords.words('english'))
    all_words = list(question.split(" "))
    filteredQuestion_raw = ""
    for word in all_words: 
        if word not in en_stops:
            filteredQuestion_raw = filteredQuestion_raw + " " + word.lower()

    def unique_list(l):
        ulist = []
        [ulist.append(x) for x in l if x not in ulist]
        return ulist

    filteredQuestion_raw2 = re.sub(r"[^a-zA-Z0-9]+", ' ', filteredQuestion_raw)
    filteredQuestion = ' '.join(unique_list(filteredQuestion_raw2.split()))

    HourAnswer = hours(intent)
    if HourAnswer:
        return HourAnswer

    Recommendation = recommend.checkIfRecommendation(uuid, filteredQuestion)
    if Recommendation:
        return Recommendation

    PhoneAnswer = phone.checkIfPhone(intent, filteredQuestion)
    if PhoneAnswer:
        return PhoneAnswer

    SubscriptionAnswer = sub.checkIfSubscription(intent, filteredQuestion)
    if SubscriptionAnswer:
        return SubscriptionAnswer

    return defaultAnswer

if __name__ == "__main__":
    timestamp = str(sys.argv[1])
    dirname = str(sys.argv[2])

    jsonInputFile = dirname + '/log/requests/' + timestamp + '.log'
    jsonOutputFile = dirname + '/log/responses/' + timestamp + '.log'

    f = open(jsonInputFile, "r")
    myjson = json.loads(f.read())
    f.close

    question = myjson["queryResult"]["queryText"]
    defaultAnswer = myjson["queryResult"]["fulfillmentText"]
    intentName = myjson["queryResult"]["intent"]["displayName"]
    endOfConversation = myjson["queryResult"]["intent"]["displayName"]

    session = myjson["session"]
    uuid = GetUUID(session)

    ## Manual testing
    # question = "Does a oneplus6 has a camera? And how much does it cost?"
    # question = "I want a subscription plan with unlimited data."
    # defaultAnswer = "Sorry, could you repeat?"
    # intentName = "test"
    # endOfConversation = "yes"

    answer = getResponse(intentName, question, defaultAnswer, endOfConversation, uuid)

    f2 = open(jsonOutputFile, 'w+')
    f2.write(answer)
    f2.close()
