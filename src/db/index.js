// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAboI6ycZ1EiMGtatIsQHsqc_hi7PwZg4Q",
  authDomain: "svelte-social-5a013.firebaseapp.com",
  projectId: "svelte-social-5a013",
  storageBucket: "svelte-social-5a013.appspot.com",
  messagingSenderId: "147313694477",
  appId: "1:147313694477:web:5633de6b9287412b04c244"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);