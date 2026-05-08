// Legacy firebase compatibility stub (no Firebase runtime).
// Auth state is managed centrally in index.html via Supabase.
(function attachCompatStub() {
  window.auth = window.auth || { currentUser: null };
  window.db = null;
  window.onAuthStateChangedCompat = function onAuthStateChangedCompat(callback) {
    callback(window.auth.currentUser || null);
    return () => {};
  };
})();