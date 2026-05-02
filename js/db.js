import { db } from "./firebase.js";
import { doc, setDoc, getDoc, updateDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// CREATE USER PROFILE
export async function createUserProfile(uid, email) {
  await setDoc(doc(db, "users", uid), {
    email: email,
    name: email.split("@")[0],
    createdAt: Date.now(),
    workoutsCompleted: 0
  });
}

// GET USER DATA
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

// UPDATE WORKOUT
export async function incrementWorkout(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const current = snap.data().workoutsCompleted || 0;
    await updateDoc(ref, {
      workoutsCompleted: current + 1
    });
  }
}