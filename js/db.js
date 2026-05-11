// Firestore wrappers for legacy callers.
(function attachDbHelpers() {
  window.createUserProfile = async function(uid, email) {
    var name = email ? email.split("@")[0] : "User";
    await window.updateUserData(uid, {
      email: email,
      name: name,
      workoutsCompleted: 0,
      createdAt: Date.now()
    });
  };

  window.getUserProfile = async function(uid) {
    if (!uid) return null;
    var snap = await window.getUserDocRef(uid).get();
    return snap.exists ? snap.data() : null;
  };

  window.incrementWorkout = async function(uid) {
    var current = (await window.getUserProfile(uid)) || {};
    await window.updateUserData(uid, {
      workoutsCompleted: (current.workoutsCompleted || 0) + 1
    });
  };
})();
