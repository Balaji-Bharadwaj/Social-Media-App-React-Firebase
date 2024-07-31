// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgZc0fkhmf-5k4hOPwZJ1cUlcQb8pfWfk",
  authDomain: "react-social-media-project1.firebaseapp.com",
  projectId: "react-social-media-project1",
  storageBucket: "react-social-media-project1.appspot.com",
  messagingSenderId: "254142043524",
  appId: "1:254142043524:web:0a2d24cc270b19449bf9d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);