// Browser-global auth helpers for plain HTML/JS usage.
(function attachAuthHelpers() {
  const getClient = () => window.supabaseClient;

  window.signup = async function signup(email, password) {
    const client = getClient();
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  window.login = async function login(email, password) {
    const client = getClient();
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  window.logout = async function logout() {
    const client = getClient();
    const { error } = await client.auth.signOut();
    if (error) throw error;
  };

  window.listenAuth = function listenAuth(callback) {
    const client = getClient();
    return client.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null);
    });
  };
})();