// firebase.js — Firebase app bootstrap for plain browser JavaScript.
// No module imports. Uses CDN compat SDK loaded in index.html.

(function initFirebase() {
  if (!window.firebase || !window.firebase.initializeApp) {
    throw new Error("[firebase.js] Firebase CDN SDK not loaded");
  }

  if (window.firebaseApp && window.firebaseAuth && window.firebaseDb && window.firebaseStorage) {
    console.info("[firebase.js] Firebase already initialised, reusing existing instances");
    return;
  }

  var firebaseConfig = {
    apiKey: "AIzaSyD8nNo-gclDL5-1Ck128I998Di0hWb6qa4",
    authDomain: "becoming-me-e96f1.firebaseapp.com",
    projectId: "becoming-me-e96f1",
    storageBucket: "becoming-me-e96f1.firebasestorage.app",
    messagingSenderId: "4596861260",
    appId: "1:4596861260:web:148f77de4e46b058dc67e9"
  };

  window.firebaseApp = window.firebase.initializeApp(firebaseConfig);
  window.firebaseAuth = window.firebase.auth();
  window.firebaseDb = window.firebase.firestore();
  window.firebaseStorage = window.firebase.storage();

  window.firebaseAuth
    .setPersistence(window.firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      console.info("[firebase.js] Auth persistence enabled (LOCAL)");
    })
    .catch(function(error) {
      console.error("[firebase.js] Failed to enable LOCAL persistence", error);
    });

  console.info("[firebase.js] Firebase initialized", {
    projectId: firebaseConfig.projectId
  });
})();
