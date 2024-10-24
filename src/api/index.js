import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthStore } from "../stores/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function login(email, password) {
  const authStore = useAuthStore();
  try {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    const url = ref(database, `users/${userCredential.user?.uid}/username`);
    const snapshot = await get(url);
    authStore.auth = userCredential.user;
    authStore.name = snapshot.val();
  } catch (error) {
    alert("Email or Password wrong please try again!");
    return "error";
  }
}

function logout() {
  const authStore = useAuthStore();
  const auth = getAuth();
  localStorage.setItem("keeplogin", false);
  signOut(auth);
  authStore.auth = null;
}

async function appSignUp(email, password, username, phone) {
  try {
    const authStore = useAuthStore();
    const auth = getAuth();
    const res = await createUserWithEmailAndPassword(auth, email, password);

    set(ref(database, "users/" + res.user.uid), {
      email: email,
      username: username,
      phonenumber: phone,
    });

    authStore.auth = res.user;
    authStore.name = username;
  } catch (error) {
    alert(error);
    return "error";
  }
}

export { login, logout, database, app, appSignUp };
