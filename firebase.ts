// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw-qG_9kJFtugVTLdm5pe5QttV-KHdmO0",
  authDomain: "cocinista-47e10.firebaseapp.com",
  projectId: "cocinista-47e10",
  storageBucket: "cocinista-47e10.appspot.com",
  messagingSenderId: "406418803972",
  appId: "1:406418803972:web:435bcb63ef44e073ec9451"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;