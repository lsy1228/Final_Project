import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxS3dnzMob7N8AVrINa3doa9VSLt2PDd4",
  authDomain: "immutable-finalproj.firebaseapp.com",
  projectId: "immutable-finalproj",
  storageBucket: "immutable-finalproj.appspot.com",
  messagingSenderId: "597264130146",
  appId: "1:597264130146:web:382e8ef501a76b3192713b",
  measurementId: "G-NJSFHHK126"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);