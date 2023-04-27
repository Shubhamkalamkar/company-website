import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// firestore
import {getFirestore} from "@firebase/firestore";

import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAkhnJlRY3nyMPhHftZXXYhrK4xItZJCOY",
  authDomain: "digitalguruindia-a1e40.firebaseapp.com",
  projectId: "digitalguruindia-a1e40",
  storageBucket: "digitalguruindia-a1e40.appspot.com",
  messagingSenderId: "844269230349",
  appId: "1:844269230349:web:3f1ffb79b4cfe321937844",
  measurementId: "G-CEMQ5NEEJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
