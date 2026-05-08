import { supabase } from "../supabase.js";

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

window.loginWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: { prompt: "select_account" },
        redirectTo: window.location.origin + window.location.pathname,
      },
    });
    if (error) throw error;
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};

supabase.auth.onAuthStateChange((_event, session) => {
  currentUser = session?.user || null;
  userData = currentUser?.user_metadata?.becoming_me || null;
  updateUI();
});
