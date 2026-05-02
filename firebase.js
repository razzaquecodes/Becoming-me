import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD8nNo-gclDL5-1Ck128I998Di0hWb6qa4",
  authDomain: "becoming-me-e96f1.firebaseapp.com",
  projectId: "becoming-me-e96f1",
  storageBucket: "becoming-me-e96f1.firebasestorage.app",
  messagingSenderId: "4596861260",
  appId: "1:4596861260:web:148f77de4e46b058dc67e9",
  measurementId: "G-L779DB3WXH"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };