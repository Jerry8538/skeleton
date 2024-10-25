//https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore,collection, addDoc,doc,getDoc ,getDocs,setDoc,query,orderBy, deleteDoc} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC7RtocKn9RRMREVis0KoJeIISZMysXFaA",
  authDomain: "pls-work-c0d1a.firebaseapp.com",
  projectId: "pls-work-c0d1a",
  storageBucket: "pls-work-c0d1a.appspot.com",
  messagingSenderId: "576747885610",
  appId: "1:576747885610:web:1aa9af29c5ad8633299f53",
};

// Initialize Firebase if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services as needed
export const db = getFirestore(app);
export default app;