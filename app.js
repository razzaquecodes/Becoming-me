// Legacy helper file kept for browser compatibility.
// Uses global auth helpers from auth.js (no ES modules).

// ===== PAGE SWITCH =====
window.showPage = function(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
      await window.login(email, password);
      showToast("Welcome back 🔥");
    } else {
      await window.signup(email, password);
      showToast("Account created 🚀");
    }

    setTimeout(() => showPage("profile"), 1000);

  } catch (err) {
    showToast(err.message);
  }
};

// ===== AUTH STATE =====
window.listenAuth(user => {
  if (user) {
    console.log("Logged in:", user.email);
  } else {
    console.log("Logged out");
  }
});

// ===== LOGOUT BUTTON (optional) =====
window.logoutUser = function() {
  window.logout();
  showToast("Logged out");
  showPage("login");
};