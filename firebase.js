// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDp9pRObNA37r8TB7VGEqAp72htkZWY8Zs",
  authDomain: "gurukrupa-tours.firebaseapp.com",
  projectId: "gurukrupa-tours",
  storageBucket: "gurukrupa-tours.firebasestorage.app",
  messagingSenderId: "503350520425",
  appId: "1:503350520425:web:f2f2c8c33fe601b79210f8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);