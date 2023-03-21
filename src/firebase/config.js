// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa_4ZD4mcJVTIDKvWfHlO2_pzJUeqTC4g",
  authDomain: "dojo-blog-f8767.firebaseapp.com",
  projectId: "dojo-blog-f8767",
  storageBucket: "dojo-blog-f8767.appspot.com",
  messagingSenderId: "387308844466",
  appId: "1:387308844466:web:4408fd9583c7da7bd960ab",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export { db };
