#!/usr/bin/python3
import sys
import json
import sys

sys.path.append('./phone.py')
sys.path.append('./subscription.py')

import phone as phone
import subscription as sub

import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

def getResponse(intent, question, defaultAnswer, endOfConversation):
    en_stops = set(stopwords.words('english'))
    all_words = list(question.split(" "))
    filteredQuestion = ""
    for word in all_words: 
        if word not in en_stops:
            filteredQuestion = filteredQuestion + " " + word

    PhoneAnswer = phone.checkIfPhone(intent, question)
    if PhoneAnswer:
        return PhoneAnswer
    subscriptionAnswer = sub.checkIfSubscription(intent, question)
    if subscriptionAnswer:
        return subscriptionAnswer
    return(defaultAnswer)

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

    answer = getResponse(intentName, question, defaultAnswer, endOfConversation)

    f2 = open(jsonOutputFile, 'w+')
    f2.write(answer)
    f2.close()
