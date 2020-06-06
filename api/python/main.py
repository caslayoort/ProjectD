#!/usr/bin/python
import sys
import json

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

    f2 = open(jsonOutputFile, 'w+')
    f2.write(question);
    f2.close()
