import sys
sys.path.append('./recommendation.py')
import recommendation as recommend

def Phone(question):
    return question

def checkIfPhone(intent, question):
    if intent == "phone.brands.lists":
        return Phone(question)
    elif intent == "phone.info":
        return Phone(question)
    elif intent == "phone.info.samsung":
        return Phone(question)
    elif intent == "phone.info.samsung.model":
        return Phone(question)
    else:
        # loop over brand names to find a phone brand, if so it is a phone. if we dont find anything we wont return anything.
        return("phone does not exists.")

