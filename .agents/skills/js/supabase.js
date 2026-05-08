import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://xxwrfugjxnfhsilwzulv.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_KOLnnfY7G7q5l5goYzRzKg_GEBHd8F_";

const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// GOOGLE LOGIN
async function googleLogin() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google"
  });

  if (error) {
    console.log(error);
  }
}

// GET CURRENT USER
async function getCurrentUser() {
  const {
    data: { user }
  } = await supabaseClient.auth.getUser();

  return user;
}

// LOGOUT
async function logoutUser() {
  await supabaseClient.auth.signOut();
  location.reload();
}