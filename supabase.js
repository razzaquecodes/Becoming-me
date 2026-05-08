const SUPABASE_URL = "https://xxwrfugjxnfhsilwzulv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KOLnnfY7G7q5l5goYzRzKg_GEBHd8F_";

if (!window.supabase || typeof window.supabase.createClient !== "function") {
  throw new Error("Supabase CDN not loaded. Add the supabase-js CDN script before supabase.js");
}

// Create exactly one global client instance.
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
  console.info("[Supabase] Client initialized", { url: SUPABASE_URL });
}

async function googleLogin() {
  console.info("[Supabase OAuth] Start Google OAuth", {
    origin: window.location.origin,
    href: window.location.href,
  });
  const { error } = await window.supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: { prompt: "select_account" },
      redirectTo: window.location.origin,
    },
  });
  if (error) {
    console.error("[Supabase OAuth] signInWithOAuth error", error);
    throw error;
  }
  console.info("[Supabase OAuth] Redirect initiated");
}

async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await window.supabaseClient.auth.getUser();
  if (error) {
    console.error("[Supabase Auth] getCurrentUser error", error);
    throw error;
  }
  console.info("[Supabase Auth] getCurrentUser success", {
    id: user?.id,
    email: user?.email,
  });
  return user;
}

async function logoutUser() {
  const { error } = await window.supabaseClient.auth.signOut();
  if (error) {
    console.error("[Supabase Auth] logout error", error);
    throw error;
  }
  console.info("[Supabase Auth] logout success");
  location.reload();
}

window.googleLogin = googleLogin;
window.getCurrentUser = getCurrentUser;
window.logoutUser = logoutUser;
