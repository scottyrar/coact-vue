<template>
  <div>
    <navbar />
    <div class="image-container">
      <div class="text-white responsive-image">
        <div class="image-layer bg-test"></div>
        <div class="image-layer bg-black opacity-60 dark:opacity-60"></div>
        <div class="content">
          <div class="m-10">
            <p class="font-kanit text-7xl hide:text-4xl">
              We make internet of things simple for your life!
            </p>
            <br />
            <p class="font-kanit text-xl zfold:text-sm">
              One app to remotely manage connected electronic devices of Co'act
            </p>
            <br />
            <div class="show:grid show:grid-cols-4 show:gap-4">
              <button
                class="bg-greenl hover:opacity-90 w-full rounded-2xl py-4 text-xl font-kanit mt-4"
                @click="
                  redirectTo(
                    'https://drive.google.com/file/d/1rQFPBswo10IRzZ5f1of4lxLOHbClTo0c/view?usp=drive_link'
                  )
                "
              >
                Get Start
              </button>
              <button
                class="border border-b hover:bg-white hover:text-black w-full rounded-2xl py-4 text-xl font-kanit mt-4 text-center"
                @click="scrollTo('#tutorial')"
              >
                Tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="tutorial" class="p-5 font-kanit space-y-5 pb-20">
      <p class="text-3xl dark:text-white">
        How to paring devices in Co'act app
      </p>
      <div class="bg-grayd4 rounded-2xl bg-opacity-60">
        <Carousel
          :autoplay="5000"
          :wrap-around="true"
          class="w-full h-fit bg-transparent"
        >
          <Slide
            :key="index + 1"
            v-for="(bgpic, index) in bgPics"
            class="p-5 flex flex-col space-y-3"
          >
            <p class="dark:text-white text-2xl">Step {{ index + 1 }}</p>
            <img :src="bgpic" class="h-[65vh] rounded-xl" />
            <p v-show="index === 0" class="dark:text-white text-xl">
              Go to the Pairing page.
            </p>
            <p v-show="index === 1" class="dark:text-white text-xl">
              Go to Settings and select the Wi-Fi that says Co'act.
            </p>
            <p v-show="index === 2" class="dark:text-white text-xl">
              Select the Wi-Fi you want the  Co'act device to connect to.
            </p>
            <p v-show="index === 3" class="dark:text-white text-xl">
              Enter your Wi-Fi password and press the green button.
            </p>
            <p v-show="index === 4" class="dark:text-white text-xl">
              Connection successful, please connect WiFi with internet to your
              phone.
            </p>
          </Slide>
          <template #addons>
            <Pagination class="pb-5 pagination bg-opacity-20" />
          </template>
        </Carousel>
      </div>
    </div>
    <div
      class="h-fit min-h-[55vh] bg-grayd1 fount-kanit show:grid show:grid-cols-3 gap-3 space-y-10 text-white text-base p-24"
    >
      <div class="space-y-3">
        <p>Co'act®</p>
        <p>Terms of Use</p>
        <p>Privacy Policy</p>
      </div>
      <div class="space-y-3">
        <p @click="$router.push({ name: 'home' })" class="cursor-pointer">
          Home
        </p>
        <p @click="$router.push({ name: 'product' })" class="cursor-pointer">
          Product
        </p>
        <p @click="$router.push({ name: 'devices' })" class="cursor-pointer">
          Devices
        </p>
        <p @click="$router.push({ name: 'dashboard' })" class="cursor-pointer">
          Dashboard
        </p>
        <p @click="$router.push({ name: 'history' })" class="cursor-pointer">
          History
        </p>
      </div>
      <div class="space-y-3">
        <p class="text-2xl pb-4">OUR OFFICE</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
          deserunt eaque tempore, sint facere, quo quas et tempora
          exercitationem, atque debitis consequatur explicabo magnam. Ipsa,
          vero. Veritatis dolorum nam architecto!
        </p>
        <p>jackit.khe@coact.tech</p>
        <p>+66 200 2200</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import navbar from "@/components/Nav.vue";
import axios from "axios";
import step1 from "../assets/img/howto/step1.jpeg";
import step2 from "../assets/img/howto/step2.jpeg";
import step3 from "../assets/img/howto/step3.jpeg";
import step4 from "../assets/img/howto/step4.jpeg";
import step5 from "../assets/img/howto/step5.jpeg";

const redirectTo = (url) => {
  window.open(url, "_blank");
};

const scrollTo = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const bgPics = [step1, step2, step3, step4, step5];
</script>

<style scoped lang="scss">
.image-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.responsive-image {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.image-layer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

:deep(.pagination) {
  .carousel__pagination-button::after {
    width: 8.8px;
    height: 8.8px;
    border-radius: 100%;
    background-color: #9ca3af;
  }
  .carousel__pagination-button--active::after {
    width: 20.53px;
    height: 8.8px;
    border-radius: 10px;
    background-color: #e4e2df;
    --tw-bg-opacity: 0.2;
  }
}
</style>
