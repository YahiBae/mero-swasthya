import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAMxjWO19wSMIoQ-FhbLGZu_de7gla2zGM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mero-swasthya-f23d0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mero-swasthya-f23d0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mero-swasthya-f23d0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "617586249734",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:617586249734:web:00628a8a686b039d3db387",
};

const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value.trim().length > 0,
);

export const firebaseApp: FirebaseApp | null = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const firebaseAuth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null;
export const firestore: Firestore | null = firebaseApp ? getFirestore(firebaseApp) : null;

export function hasFirebaseConfig(): boolean {
  return isFirebaseConfigured;
}