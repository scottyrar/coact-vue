<template>
  <div class="flex flex-col justify-start show:justify-center h-full px-5 overflow-y-auto">
    <form class="p-5 space-y-5" @submit.prevent="signUp">
      <p class="text-2xl font-kanit">Sign Up</p>
      <p class="text-lg font-kanit">Username</p>
      <input
        type="text"
        placeholder="Enter your name"
        class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
        v-model.trim="userInput"
      />
      <p class="text-lg font-kanit">Email</p>
      <input
        type="email"
        placeholder="Enter your email"
        class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
        v-model.trim="emailInput"
      />
      <p class="text-lg font-kanit">Phonenumbrer</p>
      <input
        type="tel"
        placeholder="Enter your phone number"
        class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
        v-model.trim="telInput"
      />
      <p class="text-lg font-kanit">Password</p>
      <input
        type="password"
        placeholder="Enter your password"
        class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
        v-model.trim="passwordInput"
      />
      <p class="text-lg font-kanit">Confirm Password</p>
      <input
        type="password"
        placeholder="Enter your confirmpassword"
        class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
        v-model.trim="confirmPasswordInput"
      />
      <div class="flex gap-4">
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
          :disabled="
            !emailInput ||
            !userInput ||
            !telInput ||
            !passwordInput ||
            passwordInput.trim() === '' ||
            !confirmPasswordInput ||
            confirmPasswordInput.trim === '' ||
            confirmPasswordInput !== passwordInput
          "
          class="bg-lime-500 p-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 font-kanit"
        >
          SignUp
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { appSignUp } from "../../api/index";
import { useRouter } from "vue-router";

const router = useRouter();

const userInput = ref("");
const emailInput = ref("");
const telInput = ref("");
const passwordInput = ref("");
const confirmPasswordInput = ref("");

async function signUp() {
  try {
    const res = await appSignUp(
      emailInput.value,
      passwordInput.value,
      userInput.value,
      telInput.value
    );
    if (res !== 'error') {
      router.push({ name: "home" });
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
