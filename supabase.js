// supabase.js - single Supabase client instance for CDN/plain HTML usage.
// Script order required: Supabase CDN -> supabase.js -> auth.js -> js/script.js.
(function initSupabaseClient() {
  "use strict";

  var SUPABASE_URL = "https://xxwrfugjxnfhsilwzulv.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_KOLnnfY7G7q5l5goYzRzKg_GEBHd8F_";

  function showOAuthError(error) {
    console.error("[supabase.js] OAuth login failed", error);
    if (typeof window.showToast === "function") {
      window.showToast(error && error.message ? error.message : "Sign-In failed. Please try again.");
    }
  }

  function getOAuthRedirectUrl() {
    var url;
    if (window.location.protocol !== "http:" && window.location.protocol !== "https:") {
      throw new Error("Google Sign-In needs http:// or https://. Use Live Server instead of opening index.html directly.");
    }
    url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.href;
  }

  async function startOAuthLogin(provider) {
    var redirectTo;
    var result;
    provider = provider || "google";
    redirectTo = getOAuthRedirectUrl();

    console.info("[supabase.js] OAuth start", {
      provider: provider,
      origin: window.location.origin,
      redirectTo: redirectTo,
    });

    result = await window.supabaseClient.auth.signInWithOAuth({
      provider: provider,
      options: {
        queryParams: provider === "google" ? { prompt: "select_account" } : undefined,
        redirectTo: redirectTo,
      },
    });

    if (result.error) {
      console.error("[supabase.js] signInWithOAuth error", result.error);
      throw result.error;
    }
    console.info("[supabase.js] OAuth redirect initiated");
  }

  async function googleLogin() {
    try {
      return await startOAuthLogin("google");
    } catch (error) {
      showOAuthError(error);
    }
  }

  async function oauthLogin(provider) {
    try {
      return await startOAuthLogin(provider);
    } catch (error) {
      showOAuthError(error);
    }
  }

  async function getCurrentUser() {
    var result = await window.supabaseClient.auth.getUser();
    var user;
    if (result.error) {
      console.error("[supabase.js] getCurrentUser error", result.error);
      throw result.error;
    }
    user = result.data && result.data.user ? result.data.user : null;
    console.info("[supabase.js] getCurrentUser", { id: user && user.id, email: user && user.email });
    return user;
  }

  async function logoutUser() {
    var result = await window.supabaseClient.auth.signOut();
    if (result.error) {
      console.error("[supabase.js] logoutUser error", result.error);
      throw result.error;
    }
    console.info("[supabase.js] logoutUser success");
    location.reload();
  }

  console.info("[supabase.js] Initialization start");

  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    throw new Error("[supabase.js] Supabase CDN not loaded. Add the Supabase CDN script before supabase.js.");
  }

  if (!window.supabaseClient) {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
        storageKey: "becoming-me-auth",
      },
    });
    console.info("[supabase.js] Client initialized once", { url: SUPABASE_URL });
  } else {
    console.info("[supabase.js] Existing window.supabaseClient reused");
  }

  window.googleLogin = googleLogin;
  window.loginWithGoogle = googleLogin;
  window.oauthLogin = oauthLogin;
  window.getCurrentUser = getCurrentUser;
  window.logoutUser = logoutUser;
  window.__bm_supabase_ready = true;

  console.info("[supabase.js] Auth helpers exposed");
})();
