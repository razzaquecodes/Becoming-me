// auth.js — Firebase Authentication helpers.
// Must load after firebase.js.

(function attachFirebaseAuthHelpers() {
  function getAuth() {
    if (!window.firebaseAuth) {
      throw new Error("[auth.js] firebaseAuth not found. Ensure firebase.js is loaded first.");
    }
    return window.firebaseAuth;
  }

  window.signup = async function signup(email, password, profile) {
    console.info("[auth.js] signup called", { email: email });
    var auth = getAuth();
    var cred = await auth.createUserWithEmailAndPassword(email, password);
    if (profile && profile.name) {
      await cred.user.updateProfile({ displayName: profile.name });
    }
    console.info("[auth.js] signup success", { uid: cred.user.uid });
    return cred;
  };

  window.login = async function login(email, password) {
    console.info("[auth.js] login called", { email: email });
    var auth = getAuth();
    var cred = await auth.signInWithEmailAndPassword(email, password);
    console.info("[auth.js] login success", { uid: cred.user.uid });
    return cred;
  };

  window.loginWithGoogle = async function loginWithGoogle() {
    console.info("[auth.js] google oauth start");
    var auth = getAuth();
    var provider = new window.firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    var cred = await auth.signInWithPopup(provider);
    console.info("[auth.js] google oauth success", { uid: cred.user.uid, email: cred.user.email });
    return cred;
  };

  window.oauthLogin = async function oauthLogin(provider) {
    if (provider === "google") return window.loginWithGoogle();
    console.warn("[auth.js] OAuth provider not configured in Firebase Auth:", provider);
    if (typeof window.showToast === "function") {
      window.showToast(provider + " login is not configured yet.");
    }
  };

  window.listenAuth = function listenAuth(callback) {
    var auth = getAuth();
    return auth.onAuthStateChanged(function(user) {
      console.info("[auth.js] auth state changed", { uid: user ? user.uid : null });
      callback(user || null);
    });
  };

  window.getCurrentUser = async function getCurrentUser() {
    return getAuth().currentUser || null;
  };

  window.logout = async function logout() {
    var auth = getAuth();
    await auth.signOut();
    console.info("[auth.js] logout success");
  };

  // Legacy compatibility wrappers expected by existing UI code.
  window.createUserWithEmailAndPassword = async function(_auth, email, password, profile) {
    var cred = await window.signup(email, password, profile);
    return { user: cred.user };
  };

  window.signInWithEmailAndPassword = async function(_auth, email, password) {
    var cred = await window.login(email, password);
    return { user: cred.user };
  };

  window.signOutUser = async function() {
    await window.logout();
  };

  console.info("[auth.js] Firebase auth helpers attached");
})();
