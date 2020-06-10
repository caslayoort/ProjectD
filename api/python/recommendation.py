import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

if __name__ == "__main__":
    cred = credentials.Certificate("./firebase.json")
    firebase_admin.initialize_app(cred)

def recommend(uuid, question):
    if uuid:
        if "subscription" in question.lower().replace("subscription", " subscription "):
            return "All of our subscriptions are good, I cannot choose between them :P"
        else:
            db = firestore.client()
            phones_stream = db.collection(u'phones').stream()
            questions_stream = db.collection(u'askedquestions').where(u'uuid', u'==', uuid).stream()
            phones = []
            for doc in phones_stream:
                phones.append(doc.to_dict())

            questions = []
            for doc in questions_stream:
                questions.append(doc.to_dict())
            
            askedBrands = []
            askedPhones = []

            for q in questions:
                currentQuestion = str(q["request"]).lower()
                for doc in phones:
                    model = str(doc["model"]).lower()
                    brand = str(doc["brand"]).lower()
                    if __name__ == "__main__":
                        print("Question: " + currentQuestion)
                        print("Current phone: " + brand + " " + model)
                    if brand in currentQuestion:
                        askedBrands.append(brand)
                        if model in currentQuestion:
                            askedPhones.append( brand + " " + model )
                        
            if __name__ == "__main__":
                print(askedBrands)
                print(askedPhones)

            if askedPhones != []:
                # There are phones the user asked about. Assuming someone only asks for it if they are interested in it we could recommend the most asked one.
                counter = 0
                answer = askedPhones[0] 
                
                for i in askedPhones: 
                    curr_frequency = askedPhones.count(i) 
                    if(curr_frequency> counter): 
                        counter = curr_frequency 
                        answer = i
                return "We think the " + answer + " would be a perfect match for you!"
                
            elif askedBrands != []:
                # If the user has not asked for phones in the past but has asked for brands that we know we recommend a random one of that brand.
                counter = 0
                thebrand = askedBrands[0] 
                
                for i in askedBrands:
                    curr_frequency = askedBrands.count(i) 
                    if(curr_frequency> counter): 
                        counter = curr_frequency 
                        thebrand = i
                answer = thebrand
                for doc in phones:
                    model = str(doc["model"]).lower()
                    brand = str(doc["brand"]).lower()
                    if brand == thebrand:
                        answer = brand + " " + model
                
                return "We think the " + answer + " would be a perfect match for you!"

            else:
                return "Let's get to know eachother first! ask me a few questions about certain phones so I could make a good recommendation."

    else:
        return "We cannot recommend something when you are not logged in. We advise to log into our app and ask the question again."

def checkIfRecommendation(uuid, question):
    myquestion = question.replace("recommend", " recommend ")

    if "recommend" in myquestion:
        return recommend(uuid, question)
    else:
        return False

if __name__ == "__main__":
    print(checkIfRecommendation("591c6d75", "I would like a new phone, what would you recommend?"))