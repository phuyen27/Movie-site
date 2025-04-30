// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';   

const firebaseConfig = {
    apiKey: "AIzaSyDldSmE3_dvWOn02kndFmLXi1RjWnQQkB8",
    authDomain: "film-website-23dc6.firebaseapp.com",
    projectId: "film-website-23dc6",
    storageBucket: "film-website-23dc6.firebasestorage.app",
    databaseURL: "https://film-website-23dc6-default-rtdb.firebaseio.com",
    messagingSenderId: "255249762623",
    appId: "1:255249762623:web:62e7cfc8bf7f20c5fd2b8a",
    measurementId: "G-68QXN9N5YS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); 