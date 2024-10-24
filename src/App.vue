<template>
  <RouterView />
</template>

<script setup>
import { RouterView, useRouter } from "vue-router";
import { onMounted } from "vue";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthStore } from "./stores/auth";
import { app as appDb, database } from "./api/index";
import { ref, get } from "firebase/database";

const authStore = useAuthStore();
const router = useRouter();

function getCurrentUser() {
  try {
    const auth = getAuth(appDb);
    const authStore = useAuthStore();
    setPersistence(auth, browserSessionPersistence);
    onAuthStateChanged(auth, async (user) => {
      const url = ref(database, `users/${user?.uid}/username`);
      const snapshot = await get(url);
      authStore.auth = user;
      authStore.name = snapshot.val();
    });
  } catch (error) {
    console.log('app error');
    console.log(error);
  }
}

onMounted(() => {
  if (localStorage.getItem("keeplogin") === "true") {
    getCurrentUser();
  }
});
</script>

<style>
body {
  background: rgba(243, 244, 246);
  background: linear-gradient(
    90deg,
    rgba(243, 244, 246, 1) 0%,
    rgba(209, 213, 219, 1) 100%
  );
}
@media (prefers-color-scheme: dark) {
  body {
    background: rgb(28, 28, 30);
    background: linear-gradient(
      90deg,
      rgba(28, 28, 30, 1) 0%,
      rgba(58, 58, 60, 1) 100%
    );
  }
}
</style>
