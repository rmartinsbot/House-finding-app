// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB2LXz6p_akP_2rEp4EYfv3h7GC214Y0U",
  authDomain: "busca-casas-617a8.firebaseapp.com",
  databaseURL: "https://busca-casas-617a8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "busca-casas-617a8",
  storageBucket: "busca-casas-617a8.firebasestorage.app",
  messagingSenderId: "323117078949",
  appId: "1:323117078949:web:2a4b539d501c221ff0704c",
  measurementId: "G-GEKRC85H06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
