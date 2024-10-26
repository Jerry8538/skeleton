import { db } from "./lib/firebaseConfig.js"
//"https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
import { collection, addDoc, doc, getDoc, getDocs, setDoc, orderBy, deleteDoc, query, where } from "firebase/firestore";


export async function resetData() {
    const colxn = collection(db, "conversations")
    // remove everything
    const allConv = await getDocs(colxn)
    allConv.forEach(async (convDoc) => { deleteDoc(convDoc.ref) })

    // reset count to 0
    const convCount = doc(colxn, "conversationCount")
    setDoc(convCount, { num: 0 })
}

export async function addConversation() {
    const colxn = collection(db, "conversations")

    // creates a new conversation with id as count+1, and
    // creates a messages subcollection, and sets messageCount to 0
    const convCountRef = doc(colxn, "conversationCount")
    const convCount = (await getDoc(convCountRef)).data().num

    // add an empty conversation doc
    const latestConv = doc(colxn)
    await setDoc(latestConv, {
        id: convCount+1,
        ended: false,
        intensity: 0,
        keywords: "",
        mappedKeywords: "",
        polarity: 0
    })

    // update conversationCount
    await setDoc(convCountRef, { num: convCount + 1 });

    // create empty messages subcollection
    const messageColxn = collection(latestConv, "messages")
    const messageCountRef = doc(messageColxn, "messageCount")
    await setDoc(doc(messageColxn, "messageCount"), {num: 0})

}

export async function addMessage(message) {
    // just adds message to the latest conversation

    const colxn = collection(db, "conversations")

    const convCountRef = doc(colxn, "conversationCount");
    // Fetch the number of conversations to get the latest id
    const convCount = (await getDoc(convCountRef)).data().num;

    // get the latest conversationDoc
    const latestConvQuery = query(colxn, where("id", "==", convCount))
    const latestConv = (await getDocs(latestConvQuery)).docs[0]
    //console.log(latestConv)

    // collection of messages within latest conversation
    const messageColxn = collection(latestConv.ref, "messages")

    // fetch number of messages to add a new one
    const messageCountRef = doc(messageColxn, "messageCount")
    const messageCount = (await getDoc(messageCountRef)).data()

    try {
        const docRef = await addDoc(messageColxn, {
            id: messageCount.num + 1,
            input: message,
            output: ""
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    // Increment messagecount
    try {
        // Set the document with the given data
        await setDoc(messageCountRef, { num: messageCount.num + 1 });
        console.log("Message added successfully!");
    } catch (error) {
        console.error("Error setting document: ", error);
    }
}

export async function getData() {
    // THIS IS FUCKING POINTLESS BTW
    const coll = collection(db, "queries")
    const getData = await getDocs(coll)
    let ans = [];
    getData.forEach((doc) => { ans.push(doc.data()) })
    console.log(ans)
    return ans
}
export async function getOutput() {
    const colxn = collection(db, "conversations")

    const convCountRef = doc(colxn, "conversationCount");
    // Fetch the number of conversations to get the latest id
    const convCount = (await getDoc(convCountRef)).data().num;

    // get the latest conversationDoc
    const latestConvQuery = query(colxn, where("id", "==", convCount))
    const latestConv = (await getDocs(latestConvQuery)).docs[0]

    // collection of messages within latest conversation
    const messageColxn = collection(latestConv.ref, "messages")

    //console.log(getCount.data().num)

    while (true) {
        const messageCountRef = doc(messageColxn, "messageCount")
        const messageCount = await getDoc(messageCountRef)
        const q = query(messageColxn, where("id", "==", messageCount.data().num))
        const latestMessage = (await getDocs(q)).docs[0].data()

        if (latestMessage.output === '') {
            continue
        } else {
            return latestMessage.output
        }
    }
}

export async function endConv(){
    const colxn = collection(db, "conversations")

    const convCountRef = doc(colxn, "conversationCount");
    // Fetch the number of conversations to get the latest id
    const convCount = (await getDoc(convCountRef)).data().num;

    // get the latest conversationDoc
    const latestConvQuery = query(colxn, where("id", "==", convCount))
    const latestConv = (await getDocs(latestConvQuery)).docs[0]
}

//console.log(getOutput())
//resetData()
//await addConversation()
//await addMessage("I'm unhappy")
//await addMessage("I'm having troubling thoughts recently")
// await addMessage("but I don't want to kill myself and I'm not eating well")
// await addMessage("I'm sleepy and I might get fired from my job")
// await addMessage("I'm having troubling thoughts recently")
// await addMessage("I've been feeling really good recently")
// await addMessage("I feel stressed all the time and never hungry")
// await addMessage("I'm having troubling thoughts recently")
// await addMessage("but I don't want to kill myself")
//await addMessage("I'm really tired and exhausted right now")

