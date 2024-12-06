import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Function to create a user with email and password
export function doCreateUserWithEmailAndPassword(email, password) {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (response) => {
      return response;
    }
  );
}

// Function to sign in with email and password
export function doSignInWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password).then((response) => {
    return response;
  });
}

// Function to sign in with Google
export function doSignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider).then((response) => {
    return response;
  });
}

// Function to sign out
export function doSignOut() {
  return signOut(auth).then((response) => {
    return response;
  });
}
