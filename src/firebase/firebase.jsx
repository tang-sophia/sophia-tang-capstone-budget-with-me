import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbzoazTqmDxvUc3nqHcyg8OVPJGCJDF8o",
  authDomain: "budget-with-me-app.firebaseapp.com",
  projectId: "budget-with-me-app",
  storageBucket: "budget-with-me-app.firebasestorage.app",
  messagingSenderId: "402273752284",
  appId: "1:402273752284:web:c62df4c41f3556d86dd019",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
