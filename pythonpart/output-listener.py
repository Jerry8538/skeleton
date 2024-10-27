import firebase_admin
from firebase_admin import credentials, firestore
import time
from keywords import get_openai_response
from chatbot import chat_with_bot
from summary import get_conversation_summary

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client() # Create an Event for notifying main thread.

conversations_ref = db.collection("conversations")

def add_output():

    conversation_id = db.collection("conversations").document("conversationCount").get().to_dict()["num"]
    
    query_ref = conversations_ref.where("id", "==", conversation_id)
    query_result = query_ref.limit(1).stream()  # Limit to 1 document

    # Retrieve the first matching conversation document
    for conversation in query_result:
        # If the conversation is found, get the messages subcollection
        messages_ref = conversation.reference.collection("messages")
        
    # try:
    # Step 1: Get the `num` field from the messageCount document
    message_count_ref = messages_ref.document("messageCount")
    message_count_doc = message_count_ref.get()
    message_id = -1
    
    if message_count_doc.exists:
        message_id = message_count_doc.to_dict().get("num")
    else:
        print("No messageCount document found.")

    # Step 2: Query the messages subcollection for the document where `id` equals `num`
    message_query = messages_ref.where("id", "==", message_id).limit(1)
    
    
    results = message_query.get()
    input_msg = results[0].to_dict()["input"]
    output_msg = chat_with_bot(input_msg)

    if results:
        # Get the document reference
        doc_ref = results[0].reference
        try:
            # Update fields with the data provided in updated_data
            doc_ref.update({
                "id" : message_id,
                "input" : input_msg,
                "output" : output_msg
            })

            print(f"Document with ID {message_id} updated successfully.")
        except Exception as e:
            print(f"An error occurred while updating: {e}")
    else:
        print(f"No document found with ID {message_id}")


conversation_id = db.collection("conversations").document("conversationCount").get().to_dict()["num"]
    
query_ref = conversations_ref.where("id", "==", conversation_id)
query_result = query_ref.limit(1).stream()  # Limit to 1 document

# Retrieve the first matching conversation document
messages_ref = ""
for conversation in query_result:
    # If the conversation is found, get the messages subcollection
    messages_ref = conversation.reference.collection("messages")

id1 = messages_ref.document("messageCount").get().to_dict()["num"]

# Watch the document
while True:
    conv_id_now = db.collection("conversations").document("conversationCount").get().to_dict()["num"]
    
    if conversation_id == conv_id_now :
        id = messages_ref.document("messageCount").get().to_dict()["num"]
        if(id >9):
            if (id == id1):
                print("no changes")
                print(f"id is {id} and id1 is {id1}")
            else:
                print(f"change detected. now we have {id} messages")
                add_output()
                id1=id
        else:
            print(f"id is {id} and id1 is {id1}")
    
    else:
        conversation_id = db.collection("conversations").document("conversationCount").get().to_dict()["num"]
        query_ref = conversations_ref.where("id", "==", conversation_id)
        query_result = query_ref.limit(1).stream()  # Limit to 1 document

        # Retrieve the first matching conversation document
        for conversation in query_result:
            # If the conversation is found, get the messages subcollection
            messages_ref = conversation.reference.collection("messages")

        id1 = messages_ref.document("messageCount").get().to_dict()["num"]