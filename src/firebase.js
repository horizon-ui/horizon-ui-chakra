// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZw-jwwBh29_q_UHPmTicYzdqNzWY42lA",
  authDomain: "learningenglishvocab-89721.firebaseapp.com",
  projectId: "learningenglishvocab-89721",
  storageBucket: "learningenglishvocab-89721.firebasestorage.app",
  messagingSenderId: "202261358837",
  appId: "1:202261358837:web:88ed047c4ffc5fedff3dbc",
  measurementId: "G-WSF05HE81H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);