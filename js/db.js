// Browser-global metadata helpers (Supabase Auth metadata only).
(function attachDbHelpers() {
  const client = () => window.supabaseClient;

  const updateMetadata = async (patch) => {
    const {
      data: { user },
      error: userError,
    } = await client().auth.getUser();
    if (userError) throw userError;
    const existing = user?.user_metadata?.becoming_me || {};
    const { data, error } = await client().auth.updateUser({
      data: { becoming_me: { ...existing, ...patch } },
    });
    if (error) throw error;
    return data.user?.user_metadata?.becoming_me || {};
  };

  window.createUserProfile = async (_uid, email) => {
    const name = email?.split("@")[0] || "User";
    await updateMetadata({ email, name, workoutsCompleted: 0, createdAt: Date.now() });
  };

  window.getUserProfile = async () => {
    const {
      data: { user },
      error,
    } = await client().auth.getUser();
    if (error) throw error;
    return user?.user_metadata?.becoming_me || null;
  };

  window.incrementWorkout = async () => {
    const current = (await window.getUserProfile()) || {};
    await updateMetadata({ workoutsCompleted: (current.workoutsCompleted || 0) + 1 });
  };
})();