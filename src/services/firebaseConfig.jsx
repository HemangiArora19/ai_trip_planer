// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTmzT_LB5GiAGbLGF_NH6GoDLtOqfYuA4",
  authDomain: "travel-trip-app-420e9.firebaseapp.com",
  projectId: "travel-trip-app-420e9",
  storageBucket: "travel-trip-app-420e9.firebasestorage.app",
  messagingSenderId: "685639175079",
  appId: "1:685639175079:web:d55fcde0971708ca4d0482",
  measurementId: "G-W9YGNYVND4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)