//https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore,collection, addDoc,doc,getDoc ,getDocs,setDoc,query,orderBy, deleteDoc} from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase if it hasn’t been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services as needed
export const db = getFirestore(app);
export default app;