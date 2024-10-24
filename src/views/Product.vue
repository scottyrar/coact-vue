<template>
  <Nav />
  <div class="pt-20 p-3">
    <div class="grid laptop:grid-cols-2 picm:grid-cols-3 gap-2">
      <div class="w-full bg-grayl4 dark:bg-grayd3 bg-opacity-90 rounded-xl shadow p-5 flex flex-wrap gap-4 justify-center items-center cursor-not-allowed">
        <div class="w-36 h-36 bg-grayl5 dark:bg-grayd4 rounded-lg self-center justify-items-center">
          <img :src="coact4" class="w-full h-full object-cover object-center"/>
        </div>
        <div class="space-y-2 font-kanit">
          <p class="text-xl dark:text-white">Co'act Timer Box V1</p>
          <p class="text-sm dark:text-white opacity-50">Connect : Wifi 2.4Ghz or Cellular 2/3/4G</p>
          <p class="text-sm dark:text-white opacity-50">Control Power : 12 Watt</p>
          <p class="text-sm dark:text-white opacity-50">Comming Soon</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Nav from "../components/Nav.vue";
import coact1 from "../assets/img/coact1.png"
import coact2 from "../assets/img/coact2.png"
import coact3 from "../assets/img/coact3.png"
import coact4 from "../assets/img/coact4.png"

</script>

<style lang="scss" scoped></style>
