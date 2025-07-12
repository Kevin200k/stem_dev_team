import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHeHwU6vgXCuj4m8SMrvDqagWvotkjSqI",
  authDomain: "stem-comp.firebaseapp.com",
  projectId: "stem-comp",
  storageBucket: "stem-comp.firebasestorage.app",
  messagingSenderId: "1024624780702",
  appId: "1:1024624780702:web:b73d518b4a382f9667228f",
  measurementId: "G-ZYL6WQ831D"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Export what you need
export { auth, db, googleProvider, facebookProvider, analytics };