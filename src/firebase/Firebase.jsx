// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAs6o-yY8J8LkhXN345Q0UIB18-tiyOtdI',
  authDomain: 'finance-management-54111.firebaseapp.com',
  projectId: 'finance-management-54111',
  storageBucket: 'finance-management-54111.firebasestorage.app',
  messagingSenderId: '1023740989979',
  appId: '1:1023740989979:web:4c03d3d8e0ba61694a1ebe',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
