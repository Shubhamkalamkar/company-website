import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// firestore
import {getFirestore} from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDftw9h4n5HRJep8HS5Mrby3ggY5zDY02A",
  authDomain: "company-website-3d1d7.firebaseapp.com",
  projectId: "company-website-3d1d7",
  storageBucket: "company-website-3d1d7.appspot.com",
  messagingSenderId: "845038023734",
  appId: "1:845038023734:web:470c27c0d9f4c79c845497",
  measurementId: "G-RP9EMSJEPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
