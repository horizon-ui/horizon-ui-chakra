// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getApp } from "firebase/app";
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

const functions = getFunctions(getApp());

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  console.log("🔌 Đang kết nối tới Firebase Functions Emulator (127.0.0.1:5001)");
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export { functions };

