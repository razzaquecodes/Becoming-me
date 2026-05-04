// 🔥 FIXED firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  increment,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// 🔑 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyD8nNo-gclDL5-1Ck128I998Di0hWb6qa4",
  authDomain: "becoming-me-e96f1.firebaseapp.com",
  projectId: "becoming-me-e96f1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;
let userData = null;


// ✅ FIX 1 — NO TOP LEVEL AWAIT
setPersistence(auth, browserLocalPersistence);


// 🔐 LOGIN
window.loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    console.log("Login success:", user);

    await initUserData(user);
    listenUser(user);

  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed: " + error.message);
  }
};

// AFTER user login
function goToApp() {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page-profile").classList.add("active");

  // hide login page if exists
  const loginPage = document.getElementById("page-login");
  if (loginPage) loginPage.classList.remove("active");
}


// 🔓 LOGOUT
window.logoutUser = async () => {
  await signOut(auth);
  location.reload();
};


// 🔥 AUTO LOGIN
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  currentUser = user;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      profile: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      },
      stats: {
        xp: 0,
        level: 1,
        streak: 0
      },
      activity: {
        calories: 0,
        exercises: 0,
        lastActive: null
      }
    });
  }

  // ✅ ADD THIS
  goToApp();

  // 🔄 REAL TIME SYNC
  onSnapshot(ref, (docSnap) => {
    userData = docSnap.data();
    updateUI();
  });
});


// 🧠 COMPLETE EXERCISE
window.completeExercise = async (exerciseName = "Workout") => {
  if (!currentUser || !userData) return;

  const today = new Date().toISOString().split("T")[0];
  const userRef = doc(db, "users", currentUser.uid);

  // 🔹 Save workout log
  await addDoc(collection(db, "users", currentUser.uid, "workouts"), {
    name: exerciseName,
    completed: true,
    date: new Date()
  });

  // 🔹 Save daily log
  const dailyRef = doc(db, "users", currentUser.uid, "dailyLogs", today);

  await setDoc(dailyRef, {
    workouts: increment(1),
    calories: increment(50),
    date: today
  }, { merge: true });

  // 🔹 Update stats
  let newXP = userData.stats.xp + 10;
  let newLevel = Math.floor(newXP / 100) + 1;

  let newStreak = userData.stats.streak;
  if (userData.activity.lastActive !== today) {
    newStreak += 1;
  }

  await updateDoc(userRef, {
    "stats.xp": newXP,
    "stats.level": newLevel,
    "stats.streak": newStreak,
    "activity.totalWorkouts": increment(1),
    "activity.totalCalories": increment(50),
    "activity.lastActive": today
  });
};


// ✅ FIX 2 — WAIT FOR DOM
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ex-check").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("done")) return;

      btn.classList.add("done");
      completeExercise();
    });
  });
});


// 🎯 SAFE UI UPDATE
function updateUI() {
  if (!userData) return;

  const safeSet = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.innerText = value;
  };

  safeSet(".profile-name", userData.profile?.name || "User");
  safeSet(".profile-email", userData.profile?.email || "");

  safeSet("#xp", userData.stats?.xp ?? 0);
  safeSet("#level", userData.stats?.level ?? 1);
  safeSet("#streak", userData.stats?.streak ?? 0);

  safeSet("#calories", userData.activity?.calories ?? 0);
  safeSet("#completed", userData.activity?.exercises ?? 0);
}