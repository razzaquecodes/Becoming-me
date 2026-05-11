// supabase.js — Single Supabase client instance + Google OAuth helpers.
// Plain HTML/JS only. No ES modules. No npm. CDN-loaded supabase-js@2 only.

var SUPABASE_URL = "https://xxwrfugjxnfhsilwzulv.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_KOLnnfY7G7q5l5goYzRzKg_GEBHd8F_";

if (!window.supabase || typeof window.supabase.createClient !== "function") {
  throw new Error("[supabase.js] Supabase CDN not loaded. Add the supabase-js CDN <script> BEFORE supabase.js");
}

// Create exactly one global client instance.
if (!window.supabaseClient) {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,  // required for PKCE OAuth callback
      flowType: "pkce",
      storageKey: "becoming-me-auth",
    },
  });
  console.info("[supabase.js] Client initialized", { url: SUPABASE_URL });
} else {
  console.info("[supabase.js] Client already initialized — reusing existing instance");
}

function getOAuthRedirectUrl() {
  if (window.location.protocol !== "http:" && window.location.protocol !== "https:") {
    throw new Error("Google Sign-In needs the app to be opened from http:// or https://. Use Live Server instead of opening index.html directly.");
  }
  var url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  return url.href;
}

function showOAuthError(error) {
  console.error("[supabase.js] OAuth login failed", error);
  if (typeof window.showToast === "function") {
    window.showToast(error && error.message ? error.message : "Sign-In failed. Please try again.");
  }
}

async function startOAuthLogin(provider) {
  provider = provider || "google";
  var redirectTo = getOAuthRedirectUrl();
  console.info("[supabase.js] googleLogin() called", {
    provider: provider,
    origin: window.location.origin,
    redirectTo: redirectTo,
  });

  var result = await window.supabaseClient.auth.signInWithOAuth({
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
  console.info("[supabase.js] OAuth redirect initiated — browser should redirect to provider");
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
  if (result.error) {
    console.error("[supabase.js] getCurrentUser error", result.error);
    throw result.error;
  }
  var user = result.data && result.data.user ? result.data.user : null;
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

window.googleLogin = googleLogin;
window.oauthLogin = oauthLogin;
window.getCurrentUser = getCurrentUser;
window.logoutUser = logoutUser;

console.info("[supabase.js] OAuth helpers, getCurrentUser, logoutUser exposed on window");
