import { login, signup, listenAuth, logout } from "./auth.js";
import { getUserProfile, incrementWorkout } from "./db.js";

let currentUser = null;

// ===== PAGE =====
window.showPage = function(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
};

// ===== TOAST =====
window.showToast = function(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
};

// ===== AUTH =====
window.handleAuth = async function(type) {
  const email = document.querySelector(
    type === "login" ? "#loginForm input[type=email]" : "#signupForm input[type=email]"
  ).value;

  const password = document.querySelector(
    type === "login" ? "#loginForm input[type=password]" : "#signupForm input[type=password]"
  ).value;

  try {
    if (type === "login") {
      await login(email, password);
      showToast("Welcome back 🔥");
    } else {
      await signup(email, password);
      showToast("Account created 🚀");
    }

    showPage("profile");

  } catch (err) {
    showToast(err.message);
  }
};

// ===== AUTH STATE =====
listenAuth(async (user) => {
  if (user) {
    currentUser = user;

    const data = await getUserProfile(user.id);

    if (data) {
      document.querySelector(".profile-name").textContent = data.name;
      document.querySelector(".profile-handle").textContent = user.email;

      document.querySelectorAll(".p-stat-num")[1].textContent = data.workoutsCompleted;
    }

    showPage("profile");

  } else {
    currentUser = null;
  }
});

// ===== LOGOUT =====
window.logoutUser = function() {
  logout();
  showToast("Logged out");
  showPage("login");
};

// ===== SAVE WORKOUT =====
window.saveWorkout = function() {
  if (!currentUser) return;

  incrementWorkout(currentUser.id);
  showToast("Workout saved 💪");

  setTimeout(() => location.reload(), 800);
};