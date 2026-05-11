// script.js — Legacy UI sync helpers. Passive only — no auth listeners here.
// Auth state is owned by the inline <script> block in index.html.

var currentUser = null;
var userData = null;

function safeSet(id, val) {
  var el = document.getElementById(id);
  if (el) el.innerText = val;
}

function updateUI() {
  if (!userData) return;
  safeSet("xp", userData.xp !== undefined ? userData.xp : 0);
  safeSet("streak", userData.streak !== undefined ? userData.streak : 0);
  safeSet("calories", userData.caloriesBurned !== undefined ? userData.caloriesBurned : 0);
  safeSet("workouts", userData.exercisesCompleted !== undefined ? userData.exercisesCompleted : 0);
}

// Older Google-login aliases are owned by root auth.js. Do not reassign them here;
// this file loads after auth.js and must not shadow the Firebase implementation.

window.syncLegacyAuthUI = async function syncLegacyAuthUI() {
  try {
    console.info("[script.js] syncLegacyAuthUI called");
    var user = await window.getCurrentUser();
    currentUser = user || null;
    userData = currentUser ? await window.getUserProfile(currentUser.uid) : null;
    updateUI();
    console.info("[script.js] Legacy UI sync complete", { userId: currentUser ? currentUser.uid : null });
  } catch (error) {
    console.error("[script.js] Legacy UI sync failed", error);
  }
};
