let currentUser = null;
let userData = null;

function safeSet(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = val;
}

function updateUI() {
  if (!userData) return;
  safeSet("xp", userData.xp ?? 0);
  safeSet("streak", userData.streak ?? 0);
  safeSet("calories", userData.caloriesBurned ?? 0);
  safeSet("workouts", userData.exercisesCompleted ?? 0);
}

// Keep this legacy file passive to avoid duplicate auth listeners.
window.loginWithGoogle = window.googleLogin;

window.syncLegacyAuthUI = async function syncLegacyAuthUI() {
  try {
    const user = await window.getCurrentUser();
    currentUser = user || null;
    userData = currentUser?.user_metadata?.becoming_me || null;
    updateUI();
    console.info("[Auth] Legacy UI sync complete", { userId: currentUser?.id || null });
  } catch (error) {
    console.error("[Auth] Legacy UI sync failed", error);
  }
};
