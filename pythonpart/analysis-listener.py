import firebase_admin
from firebase_admin import credentials, firestore
import time
from AI import final_return

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client() # Create an Event for notifying main thread.

conversations_ref = db.collection("conversations")


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
        output_text = message_data.get("output", "")

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

    if results:
        # Get the document reference
        doc_ref = results[0].reference
        try:
            # Update fields with the data provided in updated_data
            doc_ref.update({
                "id":conversation_id,
                "polarity":objectives[0],
                "keywords":objectives[1],
                "mappedKeywords":objectives[2],
                "intensity":objectives[3]
            })
            print(f"Document with ID {id} updated successfully.")
        except Exception as e:
            print(f"An error occurred while updating: {e}")
    else:
        print(f"No document found with ID {id}")

    # if results:
    #     # Get the document reference
    #     doc_ref = results[0].reference
    #     try:
    #         # Update fields with the data provided in updated_data
    #         doc_ref.update({
    #             "id":id,
    #             "input":input_msg,
    #             "output":output_msg
    #         })
    #         print(f"Document with ID {id} updated successfully.")
    #     except Exception as e:
    #         print(f"An error occurred while updating: {e}")
    # else:
    #     print(f"No document found with ID {id}")

#print(conversations_ref.document("conversationCount").get().to_dict())

old_id = -1

while True:
    conversation_id = db.collection("conversations").document("conversationCount").get().to_dict()["num"]
    query = conversations_ref.where("id", "==", conversation_id).limit(1)
    results = query.get()
    ended = results[0].to_dict()["ended"]
    if (ended and old_id != conversation_id):
        print("Convo has ended")
        add_summary()
        old_id = conversations_ref.document("conversationCount").get().to_dict()["num"]
    else:
        print(f"no change- convo-id = {conversation_id} and old_id = {old_id}")
        continue
    #time.sleep(1)

