// ===============================
// 🔥 FIREBASE IMPORTS
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ===============================
// 🔑 FIREBASE CONFIG (YOURS)
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyD8nNo-gclDL5-1Ck128I998Di0hWb6qa4",
  authDomain: "becoming-me-e96f1.firebaseapp.com",
  projectId: "becoming-me-e96f1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence);

// ===============================
// 👤 GLOBAL USER
// ===============================
let currentUser = null;
let userData = null;


// ===============================
// 🔐 LOGIN
// ===============================
window.loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    currentUser = user;

    await initUserData(user);

  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};


// ===============================
// 🧠 INIT USER DATA
// ===============================
async function initUserData(user) {
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
        streak: 0
      },
      activity: {
        calories: 0,
        workouts: 0
      }
    });
  }
}


// ===============================
// 🔄 REAL TIME LISTENER
// ===============================
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  currentUser = user;

  const ref = doc(db, "users", user.uid);

  onSnapshot(ref, (snap) => {
    userData = snap.data();
    updateUI();
  });
});


// ===============================
// 🎯 UPDATE UI
// ===============================
function updateUI() {
  if (!userData) return;

  const safe = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  safe("xp", userData.stats?.xp ?? 0);
  safe("streak", userData.stats?.streak ?? 0);
  safe("calories", userData.activity?.calories ?? 0);
  safe("workouts", userData.activity?.workouts ?? 0);
}


// ===============================
// 🎥 CAMERA START
// ===============================
let video;

window.startCamera = async () => {
  video = document.getElementById("cameraFeed");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });

    video.srcObject = stream;

  } catch (e) {
    console.error("Camera error", e);
    alert("Camera not working");
  }
};


// ===============================
// 🧠 FOOD DATABASE (DEMO AI)
// ===============================
const foodDB = {
  rice: { calories: 130 },
  roti: { calories: 120 },
  chicken: { calories: 239 },
  egg: { calories: 155 }
};


// ===============================
// 🔍 SCAN FOOD
// ===============================
window.scanFood = async () => {

  const viewport = document.querySelector(".cal-cam-viewport");
  const scanLine = document.querySelector(".cal-scan-line");

  // start animation
  viewport.classList.add("scanning");
  scanLine.classList.add("active");

  setTimeout(async () => {

    viewport.classList.remove("scanning");
    scanLine.classList.remove("active");

    // 🎯 fake AI detect
    const foods = Object.keys(foodDB);
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    const data = foodDB[randomFood];

    // update UI
    updateFoodUI(randomFood, data);

    // 🔥 SAVE TO FIRESTORE
    if (currentUser) {
      const ref = doc(db, "users", currentUser.uid);

      await updateDoc(ref, {
        "activity.calories": increment(data.calories),
        "stats.xp": increment(10)
      });
    }

  }, 2500);
};


// ===============================
// 🍽️ UPDATE FOOD UI
// ===============================
function updateFoodUI(name, data) {
  const foodName = document.getElementById("foodName");
  const cal = document.getElementById("foodCalories");

  if (foodName) foodName.innerText = name.toUpperCase();
  if (cal) cal.innerText = data.calories + " kcal";
}