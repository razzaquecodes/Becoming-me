// Browser-global metadata helpers (Supabase Auth metadata only).
(function attachDbHelpers() {
  var client = function() {
    if (!window.supabaseClient) {
      throw new Error("[js/db.js] window.supabaseClient not found");
    }
    return window.supabaseClient;
  };

  var updateMetadata = async function(patch) {
    var userResult = await client().auth.getUser();
    var user = userResult.data && userResult.data.user ? userResult.data.user : null;
    var existing = user && user.user_metadata && user.user_metadata.becoming_me
      ? user.user_metadata.becoming_me
      : {};
    var result;
    if (userResult.error) throw userResult.error;
    result = await client().auth.updateUser({
      data: { becoming_me: Object.assign({}, existing, patch || {}) },
    });
    if (result.error) throw result.error;
    return result.data && result.data.user && result.data.user.user_metadata
      ? result.data.user.user_metadata.becoming_me || {}
      : {};
  };

  window.createUserProfile = async function(_uid, email) {
    var name = email ? email.split("@")[0] : "User";
    await updateMetadata({ email, name, workoutsCompleted: 0, createdAt: Date.now() });
  };

  window.getUserProfile = async function() {
    var result = await client().auth.getUser();
    var user = result.data && result.data.user ? result.data.user : null;
    if (result.error) throw result.error;
    return user && user.user_metadata ? user.user_metadata.becoming_me || null : null;
  };

  window.incrementWorkout = async function() {
    var current = (await window.getUserProfile()) || {};
    await updateMetadata({ workoutsCompleted: (current.workoutsCompleted || 0) + 1 });
  };
})();
