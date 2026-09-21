import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDA-6bYatqTqOPp8yIPuFoG2RAPRbc94SQ",
  authDomain: "interiors-1a930.firebaseapp.com",
  projectId: "interiors-1a930",
  storageBucket: "interiors-1a930.firebasestorage.app",
  messagingSenderId: "476682163131",
  appId: "1:476682163131:web:14349b639eb3afeeedea9e",
  measurementId: "G-ZW6CXS9WEF"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);
