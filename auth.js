// auth.js — Firebase Authentication helpers.
// Must load after firebase.js.

(function attachFirebaseAuthHelpers() {
  function getAuth() {
    if (!window.firebaseAuth) {
      throw new Error("[auth.js] firebaseAuth not found. Ensure firebase.js is loaded first.");
    }
    return window.firebaseAuth;
  }

  function googleProvider() {
    var provider = new window.firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return provider;
  }

  function shouldFallbackToRedirect(error) {
    var code = error && error.code;
    return code === "auth/popup-blocked" ||
      code === "auth/popup-closed-by-user" ||
      code === "auth/cancelled-popup-request" ||
      code === "auth/operation-not-supported-in-this-environment";
  }

  function showAuthError(error) {
    var code = error && error.code;
    var message = (error && error.message) || "Google sign-in failed";

    if (code === "auth/unauthorized-domain") {
      message = "This domain is not allowed in Firebase Auth. Add it under Authentication > Settings > Authorized domains.";
      console.error("[auth.js] Fix unauthorized-domain by adding these to Firebase authorized domains:", {
        currentHost: window.location.hostname,
        addDomains: ["127.0.0.1", "localhost"],
        currentOrigin: window.location.origin
      });
    } else if (code === "auth/popup-closed-by-user") {
      message = "Google sign-in was cancelled.";
    } else if (code === "auth/account-exists-with-different-credential") {
      message = "An account already exists with this email using another sign-in method.";
    }

    console.error("[auth.js] google oauth error", error);
    if (typeof window.showToast === "function") window.showToast(message);
    return message;
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
    console.info("[auth.js] oauth context", {
      origin: window.location.origin,
      hostname: window.location.hostname
    });
    var auth = getAuth();
    try {
      var cred = await auth.signInWithPopup(googleProvider());
      console.info("[auth.js] google oauth success", { uid: cred.user.uid, email: cred.user.email });
      return cred;
    } catch (error) {
      if (shouldFallbackToRedirect(error)) {
        console.warn("[auth.js] popup sign-in unavailable, falling back to redirect", error);
        if (typeof window.showToast === "function") {
          window.showToast("Opening Google sign-in...");
        }
        await auth.signInWithRedirect(googleProvider());
        return null;
      }
      showAuthError(error);
      throw error;
    }
  };

  // Existing HTML calls googleLogin(), so keep that public name wired to Firebase.
  window.googleLogin = async function googleLogin() {
    return window.loginWithGoogle();
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

  getAuth().getRedirectResult()
    .then(function(result) {
      if (result && result.user) {
        console.info("[auth.js] google redirect success", {
          uid: result.user.uid,
          email: result.user.email
        });
      }
    })
    .catch(showAuthError);

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
