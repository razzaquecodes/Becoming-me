// db.js — Firestore and Storage helpers for profile/progress persistence.
// Must load after firebase.js.

(function attachFirebaseDbHelpers() {
  function getDb() {
    if (!window.firebaseDb) throw new Error("[db.js] firebaseDb not initialised");
    return window.firebaseDb;
  }

  function getStorage() {
    if (!window.firebaseStorage) throw new Error("[db.js] firebaseStorage not initialised");
    return window.firebaseStorage;
  }

  function baseUserData(user) {
    return {
      name: user.displayName || (user.email ? user.email.split("@")[0] : "User"),
      email: user.email || "",
      photo: user.photoURL || null,
      xp: 0,
      level: 0,
      streak: 0,
      bestStreak: 0,
      sessions: 0,
      exercisesCompleted: 0,
      caloriesBurned: 0,
      weekWorkouts: 0,
      monthSessions: 0,
      lastWorkoutDate: null,
      dailyGoalExercises: 0,
      history: [],
      achievements: [],
      workoutProgress: {},
      nutritionProgress: {},
      profileCustomization: {},
      createdAt: Date.now(),
      lastLogin: Date.now()
    };
  }

  window.getUserDocRef = function getUserDocRef(uid) {
    return getDb().collection("users").doc(uid);
  };

  window.ensureUserDoc = async function ensureUserDoc(user) {
    var ref = window.getUserDocRef(user.uid);
    var snap = await ref.get();
    if (!snap.exists) {
      await ref.set(baseUserData(user));
      return baseUserData(user);
    }
    var existing = snap.data() || {};
    var merged = Object.assign({}, baseUserData(user), existing, { lastLogin: Date.now() });
    await ref.set(merged, { merge: true });
    return merged;
  };

  window.updateUserData = async function updateUserData(uid, patch) {
    var ref = window.getUserDocRef(uid);
    await ref.set(Object.assign({}, patch, { updatedAt: Date.now() }), { merge: true });
  };

  window.uploadProfilePhoto = async function uploadProfilePhoto(uid, file) {
    var storageRef = getStorage().ref().child("profile-pictures/" + uid + "/" + Date.now() + "-" + file.name);
    await storageRef.put(file);
    var url = await storageRef.getDownloadURL();
    await window.updateUserData(uid, { photo: url });
    return url;
  };

  console.info("[db.js] Firestore/Storage helpers attached");
})();
