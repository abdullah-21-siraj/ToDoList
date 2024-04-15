// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVT5AlbNijHtTmoQAfB95nZeNZKbaTriE",
  authDomain: "expense-tracker-e9722.firebaseapp.com",
  projectId: "expense-tracker-e9722",
  storageBucket: "expense-tracker-e9722.appspot.com",
  messagingSenderId: "68436946928",
  appId: "1:68436946928:web:9186d9a0f6d1d012ba3735",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
