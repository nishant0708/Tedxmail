// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEBhBv7AcPhmWS1JwfXijBEarDjsz16xM",
  authDomain: "lupo-7ba5f.firebaseapp.com",
  databaseURL: "https://lupo-7ba5f-default-rtdb.firebaseio.com",
  projectId: "lupo-7ba5f",
  storageBucket: "lupo-7ba5f.appspot.com",
  messagingSenderId: "418172032930",
  appId: "1:418172032930:web:b28842c67139e5c0e6c4fb",
  measurementId: "G-1NVNFSWR1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);