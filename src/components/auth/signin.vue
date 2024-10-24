<template>
  <div class="flex flex-col justify-center h-full p-5">
    <form class="p-5 space-y-5" @submit.prevent="signIn">
      <p class="text-2xl font-kanit">Sign In</p>
      <p class="text-lg font-kanit">Email</p>
      <input
        type="email"
        placeholder="Enter your email"
        class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
        v-model.trim="emailInput"
      />
      <p class="text-lg font-kanit">Password</p>
      <input
        type="password"
        placeholder="Enter your password"
        class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
        v-model="passwordInput"
      />
      <div class="flex w-full gap-2 flex-wrap justify-between">
        <div class="flex gap-2">
          <input type="checkbox" v-model="keepSignIn" @click="toggleKeep" />
          <p class="text-base font-kanit">Keep Sign In</p>
        </div>
        <p class="text-base font-kanit cursor-pointer" @click="$router.push({name: 'forgotpassword'})">Forgot Password?</p>
      </div>
      <div class="flex gap-4">
        <button
          type="button"
          @click="
            () => {
              router.push({ name: 'home' });
            }
          "
          class="bg-gray-300 p-3 rounded-lg font-kanit"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="
            !emailInput || !passwordInput || passwordInput.trim() === ''
          "
          class="bg-lime-500 p-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 font-kanit"
        >
          SignIn
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { login, logout } from "../../api";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  toggle: Boolean,
});
const emailInput = ref("");
const passwordInput = ref("");
const keepSignIn = ref(false);

async function signIn() {
  try {
    const res = await login(emailInput.value, passwordInput.value);
    if (res !== "error") {
      router.push({ name: "home" });
    }
  } catch (error) {
    console.log(error);
  }
}

function toggleKeep() {
  const keep = localStorage.getItem("keeplogin");
  if (keep === "true") {
    localStorage.setItem("keeplogin", false);
  } else {
    localStorage.setItem("keeplogin", true);
  }
}

onMounted(() => {
  keepSignIn.value = localStorage.getItem("keeplogin");
});
</script>
