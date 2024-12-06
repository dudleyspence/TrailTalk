import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPhfSMaHhwq0k5zxEo0OqmnR0KF-okMpE",
  authDomain: "trailtalk-b471c.firebaseapp.com",
  projectId: "trailtalk-b471c",
  storageBucket: "trailtalk-b471c.firebasestorage.app",
  messagingSenderId: "318270370702",
  appId: "1:318270370702:web:b9aaf3ee769877c2a52adf",
  measurementId: "G-M8YFW6Q2YM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
