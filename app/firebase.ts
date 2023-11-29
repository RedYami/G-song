// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAieSTYz3ppmB1jLS1WBdXjbDVL4S_5aAs",
  authDomain: "g-songs.firebaseapp.com",
  projectId: "g-songs",
  storageBucket: "g-songs.appspot.com",
  messagingSenderId: "849938594775",
  appId: "1:849938594775:web:918534f08fa3b998376992",
  measurementId: "G-EJPJSRT8G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();