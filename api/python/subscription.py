import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# For testing
if __name__ == "__main__":
    cred = credentials.Certificate("./firebase.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()

def subscription(data_size):
    collection = db.collection(u'subscriptions')
    docs = collection.stream()

    for doc in docs:
        if data_size.lower() == str(doc.to_dict()["datasize"]).lower():
            return "We found a data plan with " + data_size + " GB data for €" + doc.to_dict()["price"] + " a month."

def checkIfSubscription(intent, question):
    if "subscription" in question:
        data_size = False
        try: data_size = list(filter(str.isdigit, question))[0]
        except: pass
        if data_size:
            return subscription(str(data_size))
        if "unlimited" in question:
            return subscription("unlimited")
        else:
            return "We don't have that data plan."
    else:
        return False

# For testing this file.
if __name__ == "__main__":
    print(checkIfSubscription("safdbf", "I am looking for a subscription with 8GB data."))
    print(checkIfSubscription("safdbf", "I am looking for a subscription plan with unlimited data."))