// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    //apiKey:"AIzaSyBE20bT4U9B85jkrpjgj9svq6uNGKKX0Zc",
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID,
    // apiKey: "AIzaSyBE20bT4U9B85jkrpjgj9svq6uNGKKX0Zc",
    // authDomain: "photogram-b9625.firebaseapp.com",
    // projectId: "photogram-b9625",
    // storageBucket: "photogram-b9625.firebasestorage.app",
    // messagingSenderId: "878362782844",
    // appId: "1:878362782844:web:23686726ec4bf08c03adf9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export admin for use in other parts of your server
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
