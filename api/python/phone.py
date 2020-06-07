import sys

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# For testing
if __name__ == "__main__":
    cred = credentials.Certificate("./firebase.json")
    firebase_admin.initialize_app(cred)

sys.path.append('./recommendation.py')
import recommendation as recommend

db = firestore.client()

def Phone(question_raw, intentIsRight):
    #get data
    collection = db.collection(u'phones')
    docs = collection.stream()

    thisbrand = "unknown"
    thismodel = "unknown"
    document = ""
    defaultspecsformatching = ["camera", "display", "os"]

    question_raw2 = question_raw.replace("cost", " price ")
    question = question_raw2.replace("pricetag", " price ")
    print(question)

    # Detect if we know a phone and save the brand and model
    for doc in docs:
        if str(doc.to_dict()["brand"]).lower() in question.lower():
            thisbrand = doc.to_dict()["brand"]
        if str(doc.to_dict()["model"]).lower() in question.lower():
            thismodel = doc.to_dict()["model"]
            if thisbrand.lower() == doc.to_dict()["brand"].lower():
                document = doc.to_dict()
                break
    
    # We don't have a brand or model
    if thisbrand == "unknown" and thismodel == "unknown":
        return False

    # We found a phone and have data on it.
    elif document != "":
        defaultreturnstr = "We have the " + thisbrand + " " + thismodel + "."
        returnstr = "We have the " + thisbrand + " " + thismodel + "."

        for i in question.split():
            if i == thismodel or i == thisbrand or i == "model" or i == "brand":
                pass
            else:
                if i in document.keys():
                    # found something a phone has
                    returnstr += " " + document[i]
            
        if defaultreturnstr == returnstr:
            for i in defaultspecsformatching:
                if i in question:
                    returnstr += " There is no " + i + " on the phone."

        return returnstr

    # We found a model or a phone but not a document with data or neither.
    else:
        if intentIsRight == True:
            returnstr =  "we don't know the phone you asked for"
            if thisbrand != 'unknown': returnstr += " with the brand " + thisbrand
            if thismodel != 'unknown': 
                if thisbrand != 'unknown': returnstr += " and the model " + thismodel
                else: returnstr += " with the model " + thismodel
            return returnstr

        else:
            return False
    
def Brand():
    #get data
    collection = db.collection(u'phones')
    docs = collection.stream()

    brandlist = ""

    for doc in docs:
        brandlist = brandlist + str(doc.to_dict()["brand"]).lower() + " "

    def unique_list(l):
        ulist = []
        [ulist.append(x) for x in l if x not in ulist]
        return ulist

    brands = ' '.join(unique_list(brandlist.split()))
    return "Here is a list of brands we sell: " + brands

def checkIfPhone(intent, question):
    if intent == "phone.brands.lists":
        return Brand()
    elif intent == "phone.info":
        return Phone(question, True)
    else:
        return Phone(question, False)

# For testing
if __name__ == "__main__":
    print (checkIfPhone("phone.info", "What does the oneplus 6 cost? And does it has a camera?"))