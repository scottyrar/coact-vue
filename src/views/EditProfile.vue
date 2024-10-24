<template>
  <Header title="Edit Profile" />
  <form class="p-5 pt-20 space-y-5" @submit.prevent="editPro">
    <p class="text-lg font-kanit text-black dark:text-white">Username</p>
    <input
      type="text"
      placeholder="Enter your name"
      class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
      v-model.trim="userInput"
    />
    <!-- <p class="text-lg font-kanit text-black dark:text-white">Email</p>
    <input
      type="email"
      placeholder="Enter your email"
      class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
      v-model.trim="emailInput"
    /> -->
    <p class="text-lg font-kanit text-black dark:text-white">Phonenumbrer</p>
    <input
      type="tel"
      placeholder="Enter your phone number"
      class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
      v-model.trim="telInput"
    />
    <div class="flex gap-4 w-full justify-center">
      <button
        type="button"
        @click="
          () => {
            $router.push({ name: 'home' });
          }
        "
        class="bg-gray-300 p-3 rounded-lg font-kanit"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="!userInput || !telInput"
        class="bg-lime-500 p-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 font-kanit"
      >
        Confirm
      </button>
    </div>
  </form>
</template>

<script setup>
import Header from "../components/Header.vue";
import { onMounted, ref } from "vue";
import { ref as dbRef, get, set } from "firebase/database";
import { database } from "../api/index";
import { useAuthStore } from "../stores/auth.js";
import { getAuth, updateEmail } from "firebase/auth";
const authStore = useAuthStore();

const userInput = ref("");
const emailInput = ref("");
const telInput = ref("");
const userAuth = ref({});

const url = dbRef(database, `users/${authStore.auth?.uid}`);

async function getUser() {
  try {
    const snapshot = await get(url);
    userAuth.value = snapshot.val();
    userInput.value = userAuth.value.username;
    emailInput.value = userAuth.value.email;
    telInput.value = userAuth.value.phonenumber;
  } catch (error) {
    console.error();
  }
}

async function editPro() {
  try {
    // if (userAuth.value?.email !== emailInput.value) {
    //   const auth = getAuth();
    //   const user = auth.currentUser;
    //   await updateEmail(user, emailInput.value);
    //   await set(
    //     dbRef(database, `users/${authStore.auth?.uid}/email`),
    //     emailInput.value
    //   );
    // }
    if (userAuth.value.username !== userInput.value) {
      await set(
        dbRef(database, `users/${authStore.auth?.uid}/username`),
        userInput.value
      );
    }
    if (userAuth.value.phonenumber !== telInput.value) {
      await set(
        dbRef(database, `users/${authStore.auth?.uid}/phonenumber`),
        telInput.value
      );
    }

    authStore.auth.email = emailInput.value
    authStore.name = userInput.value
    alert("Change Profile Success",);
    getUser();
  } catch (error) {
    console.log(error);
    alert("Change Profile Error", error.message);
  }
}

onMounted(() => {
  getUser();
});
</script>

<style></style>
