// auth.js — Browser-global auth helpers for plain HTML/JS usage.
// NOTE: This file must load AFTER supabase.js (which initialises window.supabaseClient).
// No ES module syntax. No Firebase. No npm imports. CDN-only Supabase.

(function attachAuthHelpers() {
  var getClient = function() {
    if (!window.supabaseClient) {
      throw new Error("[auth.js] window.supabaseClient not found — ensure supabase.js loads first");
    }
    return window.supabaseClient;
  };

  window.signup = async function signup(email, password, profile) {
    console.info("[auth.js] signup called", { email: email });
    var client = getClient();
    var result = await client.auth.signUp({
      email: email,
      password: password,
      options: profile && profile.name ? { data: { name: profile.name, full_name: profile.name } } : undefined,
    });
    if (result.error) { console.error("[auth.js] signup error", result.error); throw result.error; }
    console.info("[auth.js] signup success", { userId: result.data && result.data.user && result.data.user.id });
    return result.data;
  };

  window.login = async function login(email, password) {
    console.info("[auth.js] login called", { email: email });
    var client = getClient();
    var result = await client.auth.signInWithPassword({ email: email, password: password });
    if (result.error) { console.error("[auth.js] login error", result.error); throw result.error; }
    console.info("[auth.js] login success", { userId: result.data && result.data.user && result.data.user.id });
    return result.data;
  };

  // NOTE: Do NOT redefine window.logout here — index.html already defines it
  // with full UI cleanup logic. Overwriting it would break the logout button.

  window.listenAuth = function listenAuth(callback) {
    console.info("[auth.js] listenAuth attached");
    var client = getClient();
    return client.auth.onAuthStateChange(function(_event, session) {
      console.info("[auth.js] onAuthStateChange", { event: _event, userId: session && session.user ? session.user.id : null });
      callback(session && session.user ? session.user : null);
    });
  };

  console.info("[auth.js] Auth helpers attached to window");
})();
