// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAOUO-2iFpuApUObu1n3sxnfOJVaHDC-8",
  authDomain: "tpdaifirebase.firebaseapp.com",
  databaseUrl: "https://tpdaifirebase.southamerica-east1.firebasedatabase.app",
  projectId: "tpdaifirebase",
  storageBucket: "tpdaifirebase.appspot.com",
  messagingSenderId: "792894759437",
  appId: "1:792894759437:web:2c02aabf39aede9574ab44",
  measurementId: "G-M8CLK53KGE"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;