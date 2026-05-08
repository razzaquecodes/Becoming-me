import { supabase } from "./supabase.js";

export const auth = { currentUser: null };
export const db = null;

const listenerSet = new Set();

function notify(user) {
  auth.currentUser = user;
  for (const callback of listenerSet) {
    callback(user);
  }
}

supabase.auth.onAuthStateChange((_event, session) => {
  notify(session?.user || null);
});

const {
  data: { session },
} = await supabase.auth.getSession();
notify(session?.user || null);

export function onAuthStateChangedCompat(callback) {
  listenerSet.add(callback);
  callback(auth.currentUser);
  return () => listenerSet.delete(callback);
}