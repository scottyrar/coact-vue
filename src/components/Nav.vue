<template>
  <nav
    :class="{
      'bg-grayl2 dark:bg-grayd2 border-b border-grayl4 dark:border-grayd4':
        shouldShowNav || route.name !== 'home',
      'bg-opacity-0 border-opacity-0': !shouldShowNav && route.name === 'home',
      'bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm': shouldShowNav,
    }"
    class="h-16 flex justify-between items-center fixed top-0 left-0 z-50 w-full transition-all duration-300"
  >
    <div class="flex justify-items-center hide:hidden">
      <div class="flex items-center mx-6 nav:mr-3 nav:ml-4">
        <img
          src="@/assets/icon/leaf.svg"
          class="h-8 mr-1"
          alt="Flowbite Logo"
        />
        <p
          :class="{
            'text-white': !shouldShowNav && route.name === 'home',
          }"
          class="text-xl nav:text-lg dark:text-white nav:w-36 font-kanit"
        >
          Co'act
        </p>
      </div>
      <div class="flex items-center">
        <p
          @click="
            router.push({
              name: 'home',
            })
          "
          :class="{
            'text-base font-kanit flex items-center mx-2 cursor-pointer': true,
            'text-greenl dark:text-greend': route.name === 'home',
            'dark:text-white hover:text-greenl dark:hover:text-greend':
              route.name !== 'home',
            'text-white': !shouldShowNav && route.name === 'home',
          }"
        >
          Home
        </p>
        <p
          :class="{
            'text-base font-kanit flex items-center mx-2 cursor-pointer': true,
            'text-greenl dark:text-greend': route.name === 'product',
            'dark:text-white hover:text-greenl dark:hover:text-greend':
              route.name !== 'product',
            'text-white': !shouldShowNav && route.name === 'home',
          }"
          @click="
            router.push({
              name: 'product',
            })
          "
        >
          Product
        </p>
        <p
          @click="
            router.push({
              name: 'devices',
            })
          "
          :class="{
            'text-base font-kanit flex items-center mx-2 cursor-pointer': true,
            'text-greenl dark:text-greend': route.name === 'devices',
            'dark:text-white hover:text-greenl dark:hover:text-greend':
              route.name !== 'devices',
            'text-white': !shouldShowNav && route.name === 'home',
          }"
        >
          Devices
        </p>
        <p
          @click="
            router.push({
              name: 'dashboard',
            })
          "
          :class="{
            'text-base font-kanit flex items-center mx-2 cursor-pointer': true,
            'text-greenl dark:text-greend': route.name === 'dashboard',
            'dark:text-white hover:text-greenl dark:hover:text-greend':
              route.name !== 'dashboard',
            'text-white': !shouldShowNav && route.name === 'home',
          }"
        >
          Dashboard
        </p>
        <p
          @click="
            router.push({
              name: 'history',
            })
          "
          :class="{
            'text-base font-kanit flex items-center mx-2 cursor-pointer': true,
            'text-greenl dark:text-greend': route.name === 'history',
            'dark:text-white hover:text-greenl dark:hover:text-greend':
              route.name !== 'history',
            'text-white': !shouldShowNav && route.name === 'home',
          }"
        >
          History
        </p>
      </div>
    </div>
    <div class="w-16 grid justify-items-center show:hidden">
      <button
        class="w-10 h-10 hover:bg-grayl3 dark:hover:bg-grayd3 rounded-full grid"
        @click="toggleSide = !toggleSide"
      >
        <img
          src="../assets/icon/align-justify.svg"
          class="w-7 place-self-center"
        />
      </button>
    </div>
    <div class="flex items-center show:hidden">
      <img src="@/assets/icon/leaf.svg" class="h-8 mr-1" alt="Flowbite Logo" />
      <p
        :class="{
          'text-white': !shouldShowNav && route.name === 'home',
        }"
        class="text-xl font-kanit dark:text-white"
      >
        Co'act
      </p>
    </div>
    <div class="w-16 grid justify-items-center">
      <button
        class="w-10 h-10 hover:bg-grayl3 dark:hover:bg-grayd3 rounded-full grid"
        @click="toggleProfile = !toggleProfile"
      >
        <img
          src="../assets/icon/account-circle-fill.svg"
          class="w-7 place-self-center"
        />
      </button>
    </div>
  </nav>
  <div>
    <div class="flex justify-center" v-show="toggleProfile">
      <div
        class="fixed z-50 text-base laptopm:w-11/12 laptopm:mt-20 laptop:mt-16 rounded-2xl laptop:right-0 laptop:w-96 h-auto laptop:mx-4 bg-grayl2 dark:bg-grayd2 border border-grayd4 nav:mt-20"
      >
        <div class="m-2">
          <div
            class="px-4 py-3 border-b border-grayl4 dark:border-grayd4 flex flex-wrap gap-2 justify-between items-center"
          >
            <div>
              <span
                class="block text-base text-gray-900 dark:text-white font-kanit"
                >{{
                  authStore.auth !== null ? authStore?.name : "Anonymus"
                }}</span
              >
              <span
                class="block text-sm text-gray-500 truncate dark:text-gray-400 font-kanit"
                >{{
                  authStore.auth !== null ? authStore.auth.email : "Anonymus"
                }}</span
              >
            </div>
            <!-- <div
              class="flex gap-2 items-center animate-pulse p-2 border rounded-xl cursor-pointer border-black dark:border-white"
              v-if="authStore.auth?.emailVerified === false && authStore.auth !== null"
              @click="verifiedEmail"
            >
              <div class="w-6 text-greend">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"
                  ></path>
                </svg>
              </div>
              <p class="text-sm dark:text-white font-kanit">Verify Email</p>
            </div> -->
          </div>
          <ul class="my-2">
            <li class="mb-2" v-if="authStore.auth !== null">
              <a
                @click="router.push({ name: 'editprofile' })"
                class="block px-4 py-2 text-sm dark:text-white hover:text-greenl dark:hover:text-greend font-kanit rounded-xl bg-grayl3 hover:bg-grayl4 dark:bg-grayd3 dark:hover:bg-grayd4"
                >Edit Profile</a
              >
            </li>
            <li class="mb-2" v-if="authStore.auth !== null">
              <a
                @click="
                  router.push({
                    name: 'changepassword',
                  })
                "
                class="block px-4 py-2 text-sm dark:text-white hover:text-greenl dark:hover:text-greend font-kanit rounded-xl bg-grayl3 hover:bg-grayl4 dark:bg-grayd3 dark:hover:bg-grayd4"
                >Change Password</a
              >
            </li>
            <!-- <li
              class="mb-2 bg-grayl3 dark:bg-grayd3 rounded-xl"
              v-if="authStore.auth !== null"
            >
              <a
                @click="showSetting = !showSetting"
                class="block px-4 py-2 text-sm dark:text-white hover:text-greenl dark:hover:text-greend font-kanit"
                >Settings</a
              >
              <div class="pl-4 pr-2 py-3 space-y-3" v-if="showSetting">
                <a
                  @click="router.push({ name: 'editprofile' })"
                  class="block px-4 py-2 text-sm dark:text-white hover:text-greenl dark:hover:text-greend font-kanit rounded-xl bg-grayl3 hover:bg-grayl4 dark:bg-grayd3 dark:hover:bg-grayd4"
                  >Edit Profile</a
                >
                <a
                  @click="router.push({ name: 'changepassword' })"
                  class="block px-4 py-2 text-sm dark:text-white hover:text-greenl dark:hover:text-greend font-kanit rounded-xl bg-grayl3 hover:bg-grayl4 dark:bg-grayd3 dark:hover:bg-grayd4"
                  >Change Password</a
                >
              </div>
            </li> -->
            <li
              class="mb-2"
              @click="
                router.push({
                  name: 'login',
                })
              "
            >
              <a
                @click="authUser"
                class="block px-4 py-2 text-sm dark:text-white hover:text-greenl dark:hover:text-greend font-kanit rounded-xl bg-grayl3 hover:bg-grayl4 dark:bg-grayd3 dark:hover:bg-grayd4"
                >{{ authStore.auth !== null ? "Sign Out" : "Sign In" }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div
        class="fixed inset-0 flex justify-start z-50"
        v-if="toggleSide == true"
        @click="toggleSide = !toggleSide"
      >
        <div
          class="h-screen w-72 zfold:w-3/4 bg-grayl1 dark:bg-grayd3 border-r border-grayl4 dark:border-grayd4"
          @click.stop
        >
          <div
            class="p-3 h-16 flex justify-between bg-grayl2 dark:bg-grayd2 border-b border-grayl4 dark:border-grayd4"
          >
            <div class="flex items-center">
              <img src="@/assets/icon/leaf.svg" class="h-8 mr-1" />
              <p class="text-xl font-kanit dark:text-white">Co'act</p>
            </div>
            <p
              class="text-xl dark:text-white self-center cursor-pointer"
              @click="toggleSide = !toggleSide"
            >
              X
            </p>
          </div>
          <ul class="m-2">
            <li class="mb-2">
              <a
                @click="
                  router.push({
                    name: 'home',
                  })
                "
                :class="{
                  'block px-4 py-2 text-base font-kanit rounded-xl bg-grayl4 dark:bg-grayd4 hover:bg-grayl5 dark:hover:bg-grayd5 cursor-pointer': true,
                  'text-greenl dark:text-greend bg-grayl5 dark:bg-grayd5':
                    route.name === 'home',
                  'dark:text-white hover:text-greend': route.name !== 'home',
                }"
                >Home</a
              >
            </li>
            <li class="mb-2">
              <a
                @click="
                  router.push({
                    name: 'product',
                  })
                "
                :class="{
                  'block px-4 py-2 text-base font-kanit rounded-xl bg-grayl4 dark:bg-grayd4 hover:bg-grayl5 dark:hover:bg-grayd5 cursor-pointer': true,
                  'text-greenl dark:text-greend bg-grayl5 dark:bg-grayd5':
                    route.name === 'product',
                  'dark:text-white hover:text-greend': route.name !== 'product',
                }"
                >Products</a
              >
            </li>
            <li class="mb-2">
              <a
                @click="
                  router.push({
                    name: 'devices',
                  })
                "
                :class="{
                  'block px-4 py-2 text-base font-kanit rounded-xl bg-grayl4 dark:bg-grayd4 hover:bg-grayl5 dark:hover:bg-grayd5 cursor-pointer': true,
                  'text-greenl dark:text-greend bg-grayl5 dark:bg-grayd5':
                    route.name === 'devices',
                  'dark:text-white hover:text-greend': route.name !== 'devices',
                }"
                >Devices</a
              >
            </li>
            <li class="mb-2">
              <a
                @click="
                  router.push({
                    name: 'dashboard',
                  })
                "
                :class="{
                  'block px-4 py-2 text-base font-kanit rounded-xl bg-grayl4 dark:bg-grayd4 hover:bg-grayl5 dark:hover:bg-grayd5 cursor-pointer': true,
                  'text-greenl dark:text-greend bg-grayl5 dark:bg-grayd5':
                    route.name === 'dashboard',
                  'dark:text-white hover:text-greend':
                    route.name !== 'dashboard',
                }"
                >Dashboard</a
              >
            </li>
            <li class="mb-2">
              <a
                @click="
                  router.push({
                    name: 'history',
                  })
                "
                :class="{
                  'block px-4 py-2 text-base font-kanit rounded-xl bg-grayl4 dark:bg-grayd4 hover:bg-grayl5 dark:hover:bg-grayd5 cursor-pointer': true,
                  'text-greenl dark:text-greend bg-grayl5 dark:bg-grayd5':
                    route.name === 'history',
                  'dark:text-white hover:text-greend': route.name !== 'history',
                }"
                >History</a
              >
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div
      class="fixed inset-0 z-40 opacity-25 bg-black"
      @click="toggleProfile = !toggleProfile"
      v-show="toggleSide || toggleProfile"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { logout } from "../api";
import { useAuthStore } from "../stores/auth";
import { getAuth, sendEmailVerification } from "firebase/auth";

const toggleSide = ref(false);
const toggleProfile = ref(false);
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const shouldShowNav = ref(false);
const showSetting = ref(false);

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  shouldShowNav.value = scrollTop > 0;
};

function verifiedEmail() {
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      alert("Send email verify success please check your email!");
    })
    .catch((error) => {
      alert(error);
    });
}

async function authUser() {
  try {
    if (authStore.auth !== null) {
      logout();
      authStore.auth === null;
    }
    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.slide-enter-active {
  animation: slideIn 0.3s ease;
}
.slide-leave-active {
  animation: slideOut 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
