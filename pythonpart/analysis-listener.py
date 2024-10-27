import firebase_admin
from firebase_admin import credentials, firestore
import time
import json
from summary import get_conversation_summary,get_total_summary
from keywords import final_return
from datetime import datetime


# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client() # Create an Event for notifying main thread.

conversations_ref = db.collection("conversations")



def create_list(string):
    keywords_str = string.replace("],[", ",")  
    keywords = keywords_str[1:-2].split(",")
    trimmed_keywords = list(map(str.strip, keywords)) 
    trimmed_strings = list(map(lambda s: s[1:-1], trimmed_keywords))
    return trimmed_strings

def create_intensity_list(string):
    keywords_str = string.replace("],[", ",")  
    keywords = keywords_str[1:-2].split(",")
    trimmed_keywords = list(map(str.strip, keywords)) 
    return trimmed_keywords


def create_conversation(conversation_id):
    # Reference to the `messages` subcollection of the given conversation
    query_ref = conversations_ref.where("id", "==", conversation_id)
    query_result = query_ref.limit(1).stream()  # Limit to 1 document

    # Retrieve the first matching conversation document
    for conversation in query_result:
        # If the conversation is found, get the messages subcollection
        messages_ref = conversation.reference.collection("messages")
    
    # messages_ref = db.collection("conversations").document(conversation_id).collection("messages")

    # Retrieve all messages from the subcollection
    messages = messages_ref.stream()

    # Initialize an empty string to store the formatted conversation
    formatted_conversation = ""
    list = []

    # Iterate over each message document and append its input/output to the string
    for message in messages:
        message_data = message.to_dict()
        input_text = message_data.get("input", "")

        # Append formatted input and output to the conversation string
        if(input_text != ''):
            list.append(f"input: {input_text}".strip()) #output: {output_text}\n\n"

    return list  # Remove any trailing newlines

def add_summary():

    conversation_id = conversations_ref.document("conversationCount").get().to_dict()["num"]
    
    query = conversations_ref.where("id", "==", conversation_id).limit(1)
    results = query.get()

    # here we get the whole convo 
    convo = create_conversation(conversation_id)
    print(convo)
    whole_conversation = list(map(final_return, convo))
    print(whole_conversation)
    
    objectives = ["","","",""] # this is the list
    for i in range(4):
        for j in range(len(whole_conversation)):
            if(whole_conversation[j] ):
                objectives[i] += whole_conversation[j][i] + ','
                #print(objectives)

    

    # Define field mappings based on list elements
    # field_names = ["polarity", "keywords", "mappedKeywords","intensity"]
    

    query = conversations_ref.where("id", "==", conversation_id).limit(1)
    results = query.get()

    # now to create the summary of session
    mental_health_dict = {
        "Anxiety": [],
        "Career worries": [],
        "Depression": [],
        "Eating disorder": [],
        "Health anxiety": [],
        "Insomnia": [],
        "Positive outlook": [],
        "Stress": [],
        "Extreme mental health emergency": []
    }

    keywords_list = create_list(objectives[1])
    # print(keywords_list)
    mappedKeywordsList = create_list(objectives[2])
    # print(mappedKeywordsList)
    intensityList = create_intensity_list(objectives[3])
    # print(intensityList)
    polarityList = objectives[0][:-1].split(',')
    for i in range(len(polarityList)):
        if polarityList[i] == None:
            polarityList[i] = 0
    # print(polarityList)
    polarityno = list(map(int, polarityList))
    #print(polarityno)

    # Calculate the average

    # Step 1: Cube each number in the list
    cubed_numbers = [x ** 3 for x in polarityno]

    # Step 2: Calculate the average of the cubed numbers
    average_cubed = abs(sum(cubed_numbers)) / len(cubed_numbers)

    # Step 3: Take the cube root of the average
    polarity_average = average_cubed ** (1/3)

    #print(polarity_average)
    # Loop over the lists simultaneously
    for keyword, category, intensity, polarity in zip(keywords_list, mappedKeywordsList, intensityList, polarityList):
        # Check if the category exists in mental_health_dict
        if category in mental_health_dict:
            # Create the dictionary entry
            entry = {"keyword": keyword, "intensity": int(intensity), "polarity": int(polarity)}
            
            # Append the entry to the appropriate list in mental_health_dict
            mental_health_dict[category].append(entry)
            
            #print(f"Added entry to '{category}': {entry}")
    

    # Final state of mental_health_dict
    print("\nFinal mental_health_dict:")
    print(mental_health_dict)

    summary = json.dumps(mental_health_dict)

    if results:
        # Get the document reference
        # Get the current date and time
        now = datetime.now()

        # Format the date and time
        formatted_date_time = now.strftime("%d %B %Y %H:%M:%S")
        doc_ref = results[0].reference
        try:
            # Update fields with the data provided in updated_data
            doc_ref.update({
                "id":conversation_id,
                "polarity":objectives[0],
                "keywords":objectives[1],
                "mappedKeywords":objectives[2],
                "intensity":objectives[3],
                "summary": get_conversation_summary(summary),
                "time":formatted_date_time,
                "avgPolarity":int(polarity_average),
                "json":summary
            })
            print(f"Document with ID {id} updated successfully.")
        except Exception as e:
            print(f"An error occurred while updating: {e}")
    else:
        print(f"No document found with ID {id}")

def add_total_summary():
    conversation_id = conversations_ref.document("conversationCount").get().to_dict()["num"]
    
    full_summary = ""
    for i in range(conversation_id):
        query = conversations_ref.where("id", "==", i+1).limit(1)
        # print(query)
        # print(query.get())
        # print(query.get()[0].to_dict())
        query = query.get()[0].to_dict()
        print(query)
        print(full_summary )
        time_value = query.get("time", " ")
        summary_value = query.get("summary", " ")
        full_summary += f"Summary of Conversation {i+1} on Date : {time_value} \n {summary_value}"
    
    doc_ref = conversations_ref.document("total")
    doc_ref.update({
        "summary":get_total_summary(full_summary)
    })

def update_category_summary():
    return



old_id = -1

while True:
    conversation_id = db.collection("conversations").document("conversationCount").get().to_dict()["num"]
    query = conversations_ref.where("id", "==", conversation_id).limit(1)
    results = query.get()
    ended = results[0].to_dict()["ended"]
    if (ended and old_id != conversation_id):
        print("Convo has ended")
        add_summary()
        add_total_summary()
        update_category_summary()
        old_id = conversations_ref.document("conversationCount").get().to_dict()["num"]
    else:
        print(f"no change- convo-id = {conversation_id} and old_id = {old_id}")
        continue
     #time.sleep(1)