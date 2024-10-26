import firebase_admin
from firebase_admin import credentials, firestore
import time
from AI import func

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client() # Create an Event for notifying main thread.

ref = db.collection("queries")

def add_output():

    id = ref.document("count").get().to_dict()["num"]

    doc_ref = db.collection("students").document()

    query = ref.where("id", "==", id).limit(1)
    results = query.get()
    input_msg = results[0].to_dict()["input"]
    output_msg = func(input_msg)

    if results:
        # Get the document reference
        doc_ref = results[0].reference
        try:
            # Update fields with the data provided in updated_data
            doc_ref.update({
                "id":id,
                "input":input_msg,
                "output":output_msg
            })
            print(f"Document with ID {id} updated successfully.")
        except Exception as e:
            print(f"An error occurred while updating: {e}")
    else:
        print(f"No document found with ID {id}")


doc_ref = db.collection("queries").document("count")
id1 = doc_ref.get().to_dict()["num"]

# Watch the document
while True:
    id = doc_ref.get().to_dict()["num"]
    if (id == id1):
        print("no changes")
    else:
        print(f"change detected. now we have {id} students")
        add_output()
        id1=id
    time.sleep(5)