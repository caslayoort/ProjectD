def subscription(question):
    return "subscriptions will be here shortly."

def checkIfSubscription(intent, question):
    if intent == "show.subscriptions":
        return subscription(question)
    else:
        if "subscribtion" in question:
            pass