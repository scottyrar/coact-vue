<template>
  <Header title="Forgot Password" />
  <Transition
    enter-active-class="animate__animated animate__fadeInRight animate__fast"
    leave-active-class="animate__animated animate__fadeOutLeft animate__fast"
    mode="out-in"
  >
    <form
      class="p-5 pt-20 space-y-5"
      @submit.prevent="resetPass"
      v-if="!sendEmail"
    >
      <p class="text-lg font-kanit text-black dark:text-white">Email</p>
      <input
        type="email"
        placeholder="Enter your email"
        class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
        v-model.trim="emailInput"
      />
      <div class="flex gap-4 w-full justify-center">
        <button
          type="button"
          @click="
            () => {
              $router.push({ name: 'login' });
            }
          "
          class="bg-gray-300 p-3 rounded-lg font-kanit"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="!emailInput"
          class="bg-lime-500 p-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 font-kanit"
        >
          Confirm
        </button>
      </div>
    </form>
    <div
      class="flex flex-col justify-center items-center h-screen p-5 space-y-2"
      v-else
    >
      <div class="bg-greenl dark:bg-greend rounded-full p-14">
        <Reset class="text-white" />
      </div>
      <p class="text-3xl font-kanit text-black dark:text-white text-center">
        E-mail Sent!
      </p>
      <p class="text-xl font-kanit text-black dark:text-white text-center">
        Please check your email to reset your password
      </p>
      <a
        href="https://mail.google.com/"
        target="_blank"
        class="text-xl font-kanit text-greenl dark:text-greend text-center cursor-pointer border-b border-greenl dark:border-greend"
        >Open your gmail!</a
      >
    </div>
  </Transition>
</template>

<script setup>
import Header from "../components/Header.vue";
import { ref } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Reset from "../assets/icon/Reset.vue";

const auth = getAuth();

const sendEmail = ref(false);
const emailInput = ref("");

async function resetPass() {
  try {
    await sendPasswordResetEmail(auth, emailInput.value);
    sendEmail.value = true;
  } catch (error) {
    alert(error);
  }
}
</script>

<style lang="scss" scoped></style>
