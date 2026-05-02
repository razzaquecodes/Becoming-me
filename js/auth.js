import { auth } from "./firebase.js";
import { createUserProfile } from "./db.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// SIGNUP
export async function signup(email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(userCred.user.uid, email);
  return userCred;
}

// LOGIN
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// LOGOUT
export function logout() {
  return signOut(auth);
}

// LISTENER
export function listenAuth(callback) {
  onAuthStateChanged(auth, callback);
}