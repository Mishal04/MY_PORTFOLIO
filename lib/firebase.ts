import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAadUE729FsdGnKgW39jDcVEKxrbbPInVA",
  authDomain: "my-portfolio-2866c.firebaseapp.com",
  projectId: "my-portfolio-2866c",
  storageBucket: "my-portfolio-2866c.firebasestorage.app",
  messagingSenderId: "387796552704",
  appId: "1:387796552704:web:d27a05a50c1777648fdce5"
};

// Initialize Firebase for SSR compatibility
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
