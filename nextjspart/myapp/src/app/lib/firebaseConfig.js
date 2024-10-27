//https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore,collection, addDoc,doc,getDoc ,getDocs,setDoc,query,orderBy, deleteDoc} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnqMXaGVvZi0QYRHIn4gNChO5nLMg75js",
  authDomain: "megathon-database.firebaseapp.com",
  projectId: "megathon-database",
  storageBucket: "megathon-database.appspot.com",
  messagingSenderId: "1059823307848",
  appId: "1:1059823307848:web:03c161a68edd2104da5c7d"
};

// Initialize Firebase if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services as needed
export const db = getFirestore(app);
export default app;