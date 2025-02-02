// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import Storage

const firebaseConfig = {
  apiKey: "AIzaSyD0dPrA5J7xz94P-Ij3jUSIQNKCtIII500",
  authDomain: "sharingthemessage-47e08.firebaseapp.com",
  databaseURL: "https://sharingthemessage-47e08-default-rtdb.firebaseio.com",
  projectId: "sharingthemessage-47e08",
  storageBucket: "sharingthemessage-47e08.appspot.com", // ✅ Check this line
  messagingSenderId: "600369161729",
  appId: "1:600369161729:web:6f6d2a3a929517a962c200",
  measurementId: "G-6TQPNXT2EK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Initialize storage

export { auth, provider, db, storage }; // ✅ Export storage
