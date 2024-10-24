<template>
  <Header title="Change Password" />
  <form class="p-5 space-y-5" @submit.prevent="resetPass">
    <p class="text-lg font-kanit text-black dark:text-white">
      Password
    </p>
    <p class="text-lg font-kanit text-black dark:text-white">Password</p>
    <input
      type="password"
      placeholder="Enter your password"
      class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
      v-model.trim="passwordInput"
    />
    <p class="text-lg font-kanit text-black dark:text-white">
      Confirm Password
    </p>
    <input
      type="password"
      placeholder="Enter your confirmpassword"
      class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
      v-model.trim="confirmPasswordInput"
    />
    <div class="flex gap-4 w-full justify-center">
      <button
        type="button"
        @click="
          () => {
            $router.push({ name: 'home' });
          }
        "
        class="bg-gray-300 p-3 rounded-lg"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="
          !passwordInput ||
          passwordInput.trim() === '' ||
          !confirmPasswordInput ||
          confirmPasswordInput.trim === '' ||
          confirmPasswordInput !== passwordInput
        "
        class="bg-lime-500 p-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
      >
        Confirm
      </button>
    </div>
  </form>
</template>

<script setup>
import Header from "../components/Header.vue";
import { ref } from "vue";
import { getAuth, updatePassword } from "firebase/auth";
import { logout } from "../api";
import { useRouter } from "vue-router";

const router = useRouter();
const passwordInput = ref("");
const confirmPasswordInput = ref("");

async function resetPass() {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    await updatePassword(user, passwordInput.value);
    passwordInput.value = "";
    confirmPasswordInput.value = "";
    logout()
    router.push({name: 'login'})
  } catch (error) {
    alert("Change Password Error", error.message);
  }
}
</script>

<style lang="scss" scoped></style>
