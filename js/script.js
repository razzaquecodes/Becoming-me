// script.js — Legacy UI sync helpers. Passive only — no auth listeners here.
// Auth state is owned by the inline <script> block in index.html.
// Required order in index.html: Supabase CDN -> supabase.js -> auth.js -> script.js.

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

// Alias so older onclick="loginWithGoogle()" calls still work.
window.loginWithGoogle = window.googleLogin;

window.syncLegacyAuthUI = async function syncLegacyAuthUI() {
  try {
    console.info("[script.js] syncLegacyAuthUI called");
    var user = await window.getCurrentUser();
    currentUser = user || null;
    userData = currentUser && currentUser.user_metadata && currentUser.user_metadata.becoming_me
      ? currentUser.user_metadata.becoming_me
      : null;
    updateUI();
    console.info("[script.js] Legacy UI sync complete", { userId: currentUser ? currentUser.id : null });
  } catch (error) {
    console.error("[script.js] Legacy UI sync failed", error);
  }
};
