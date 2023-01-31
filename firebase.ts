// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC52Rf5YAFlQb-DRAqe7MuuQ5ySNnsIcvo",
  authDomain: "challenger-af1a0.firebaseapp.com",
  projectId: "challenger-af1a0",
  storageBucket: "challenger-af1a0.appspot.com",
  messagingSenderId: "1045201289647",
  appId: "1:1045201289647:web:6d5d9c0c420da3121eaf5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
