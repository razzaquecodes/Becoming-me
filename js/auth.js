// Legacy module replaced with browser-global helpers.
(function attachJsAuthHelpers() {
  if (window.signup && window.login && window.logout && window.listenAuth) return;
  const client = () => window.supabaseClient;

  window.signup = async (email, password) => {
    const { data, error } = await client().auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  window.login = async (email, password) => {
    const { data, error } = await client().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  window.logout = async () => {
    const { error } = await client().auth.signOut();
    if (error) throw error;
  };

  window.listenAuth = (callback) =>
    client().auth.onAuthStateChange((_event, session) => callback(session?.user || null));
})();