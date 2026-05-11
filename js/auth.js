// Legacy module replaced with browser-global helpers.
(function attachJsAuthHelpers() {
  if (window.signup && window.login && window.logout && window.listenAuth) return;
  var client = function() {
    if (!window.supabaseClient) {
      throw new Error("[js/auth.js] window.supabaseClient not found");
    }
    return window.supabaseClient;
  };

  window.signup = async function(email, password) {
    var result = await client().auth.signUp({ email: email, password: password });
    if (result.error) throw result.error;
    return result.data;
  };

  window.login = async function(email, password) {
    var result = await client().auth.signInWithPassword({ email: email, password: password });
    if (result.error) throw result.error;
    return result.data;
  };

  window.logout = async function() {
    var result = await client().auth.signOut();
    if (result.error) throw result.error;
  };

  window.listenAuth = function(callback) {
    return client().auth.onAuthStateChange(function(_event, session) {
      callback(session && session.user ? session.user : null);
    });
  };
})();
