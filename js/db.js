import { supabase, upsertBecomingMeMetadata } from "../supabase.js";

export async function createUserProfile(_uid, email) {
  const name = email?.split("@")[0] || "User";
  await upsertBecomingMeMetadata({
    email,
    name,
    workoutsCompleted: 0,
    createdAt: Date.now(),
  });
}

export async function getUserProfile(_uid) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user?.user_metadata?.becoming_me || null;
}

export async function incrementWorkout(_uid) {
  const current = (await getUserProfile(_uid)) || {};
  await upsertBecomingMeMetadata({
    ...current,
    workoutsCompleted: (current.workoutsCompleted || 0) + 1,
  });
}