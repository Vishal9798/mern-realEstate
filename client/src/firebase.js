// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a00ad.firebaseapp.com",
  projectId: "mern-estate-a00ad",
  storageBucket: "mern-estate-a00ad.appspot.com",
  messagingSenderId: "846508050212",
  appId: "1:846508050212:web:3bdf29dfc280aa1fe5d5b1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);