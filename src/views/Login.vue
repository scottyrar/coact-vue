<template>
  <div class="bg-gray-800 text-white">
    <div class="h-screen grid grid-cols-2 laptopm:hidden">
      <div>
        <Transition
          enter-active-class="animate__animated animate__slideInLeft animate__faster"
          leave-active-class="animate__animated animate__slideOutLeft animate__faster"
          mode="out-in"
        >
          <div class="h-screen w-full" v-if="toggleSwitch">
            <signin />
          </div>
          <div
            v-else
            class="bg-gradient-to-r from-greenl from-0% to-greend to-100% h-screen rounded-r-[150px] flex flex-col gap-2 justify-center items-center"
          >
            <coact class="text-white" />
            <p class="text-3xl font-kanit">Wellcom to Co'act Website</p>
            <p class="text-xl font-kanit">I don't have account yet!</p>
            <button
              class="border border-white p-3 rounded-lg m-3 font-kanit"
              @click="toggleSwitch = true"
            >
              Sign In
            </button>
          </div>
        </Transition>
      </div>
      <div>
        <Transition
          enter-active-class="animate__animated animate__slideInRight animate__faster"
          leave-active-class="animate__animated animate__slideOutRight animate__faster"
          mode="out-in"
        >
          <div class="h-screen w-full" v-if="!toggleSwitch">
            <signup />
          </div>
          <div
            v-else
            class="bg-gradient-to-l from-greenl from-0% to-greend to-100% h-screen rounded-l-[150px] flex flex-col gap-2 justify-center items-center"
          >
            <coact class="text-white" />
            <p class="text-3xl font-kanit">Wellcom to Co'act Website</p>
            <p class="text-xl font-kanit">I don't have account yet!</p>
            <button
              class="border border-white p-3 rounded-lg m-3 font-kanit"
              @click="toggleSwitch = false"
            >
              Create an account
            </button>
          </div>
        </Transition>
      </div>
    </div>
    <div class="h-screen hidden laptopm:block">
      <div class="grid grid-cols-2 absolute top-0 w-full z-[1000]">
        <button class="text-white rounded-bl-xl p-3 self-center text-xl font-kanit" :class="{'bg-greend': !toggleSwitch,'bg-green-600' : toggleSwitch}" @click="toggleSwitch = true">Sign In</button>
        <button class="text-white rounded-br-xl p-3 self-center text-xl font-kanit" :class="{'bg-greend': toggleSwitch,'bg-green-600' : !toggleSwitch}" @click="toggleSwitch = false">Sign Up</button>
      </div>
      <Transition
        :enter-active-class="enterActive"
        :leave-active-class="leveActive"
      >
        <div class="absolute w-full h-screen" v-if="toggleSwitch">
          <!-- <p @click="toggleSwitch = false">Sign Up</p> -->
          <signin />
        </div>
        <div class="absolute w-full pt-16 h-screen" v-else>
          <!-- <p @click="toggleSwitch = true">Sign In</p> -->
          <signup />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import signin from "@/components/auth/signin.vue";
import signup from "@/components/auth/signup.vue";
import coact from "@/assets/icon/Coact.vue";

const toggleSwitch = ref(true);
const enterActive = ref("animate__animated animate__fadeInLeft animate__fast");
const leveActive = ref("animate__animated animate__fadeOutRight animate__fast");

watch(toggleSwitch, (newValue) => {
  if (!newValue) {
    enterActive.value = "animate__animated animate__fadeInRight animate__fast";
    leveActive.value = "animate__animated animate__fadeOutLeft animate__fast";
  } else {
    enterActive.value = "animate__animated animate__fadeInLeft animate__fast";
    leveActive.value = "animate__animated animate__fadeOutRight animate__fast";
  }
});
</script>

<style scoped></style>
