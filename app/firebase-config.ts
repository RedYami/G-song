import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

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
export const auth = getAuth(app)