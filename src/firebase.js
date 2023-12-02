// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWipa2BCr49TMelbkGtPv3pY4O9dgVHfQ",
  authDomain: "mori-book-6b99e.firebaseapp.com",
  projectId: "mori-book-6b99e",
  storageBucket: "mori-book-6b99e.appspot.com",
  messagingSenderId: "682822948328",
  appId: "1:682822948328:web:9ab84a907cb3fbfd5fc05d",
  measurementId: "G-W8ERX4SWX6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
