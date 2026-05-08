import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://xxwrfugjxnfhsilwzulv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KOLnnfY7G7q5l5goYzRzKg_GEBHd8F_";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

const BM_METADATA_KEY = "becoming_me";

export function getBecomingMeMetadata(user) {
  return user?.user_metadata?.[BM_METADATA_KEY] || null;
}

export async function upsertBecomingMeMetadata(partialData) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("No authenticated user");
  }

  const existing = user.user_metadata || {};
  const existingAppData = existing[BM_METADATA_KEY] || {};

  const merged = {
    ...existing,
    [BM_METADATA_KEY]: {
      ...existingAppData,
      ...partialData,
    },
  };

  const { data, error } = await supabase.auth.updateUser({ data: merged });

  if (error) {
    throw error;
  }

  return data.user;
}
