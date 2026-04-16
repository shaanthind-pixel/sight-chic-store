import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQO4dKedc8GfGPjM38cg13wvR1Th1EsAo",
  authDomain: "sight-chic-store.firebaseapp.com",
  projectId: "sight-chic-store",
  storageBucket: "sight-chic-store.firebasestorage.app",
  messagingSenderId: "331698206304",
  appId: "1:331698206304:web:7f6b0ac5e9ed9e83b5f505",
  measurementId: "G-816JZYQXL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;
