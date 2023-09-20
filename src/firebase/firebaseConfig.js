// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAuKrv2Z3PqgtAgeD8NiajJpRVGzQHS44",
  authDomain: "hng-3-6b46d.firebaseapp.com",
  projectId: "hng-3-6b46d",
  storageBucket: "hng-3-6b46d.appspot.com",
  messagingSenderId: "836023535527",
  appId: "1:836023535527:web:2dc9f46861c64327505882"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);