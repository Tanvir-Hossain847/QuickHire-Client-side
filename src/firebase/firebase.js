import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnlmNtx7Z66igwck-kTvCRxcWtNW5siho",
  authDomain: "quickhire-25ef1.firebaseapp.com",
  projectId: "quickhire-25ef1",
  storageBucket: "quickhire-25ef1.firebasestorage.app",
  messagingSenderId: "1018992365383",
  appId: "1:1018992365383:web:cdd96760f116b7ab6cc662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);