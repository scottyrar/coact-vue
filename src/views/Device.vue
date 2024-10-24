<template>
  <navbar />
  <div class="my-20">
    <p class="text-2xl dark:text-white font-kanit p-3">
      Total devices : {{ totalDevices }}
    </p>
    <div class="laptop:grid grid-cols-2">
      <div
        v-for="req in deviceArr"
        class="bg-grayl4 dark:bg-grayd3 bg-opacity-90 rounded-xl flex flex-wrap justify-between gap-2 mx-2 my-3 p-2 shadow-xl border-l-4 border-greenl dark:border-greend cursor-pointer hover:opacity-70"
        @click="
          () => {
            router.push({ name: 'deviceid', params: { id: req.device_id } });
          }
        "
      >
        <div class="space-y-2">
          <p
            class="text-base zfold:text-xs dark:text-white grid content-end font-kanit"
          >
            Name:
          </p>
          <p
            class="text-2xl zfold:text-base font-semibold dark:text-white font-kanit"
          >
            {{ req.name }}
          </p>
          <p
            class="text-base zfold:text-sm font-semibold dark:text-white font-kanit"
          >
            {{ req.isconnect ? "connected" : "not connected" }}
          </p>
        </div>
        <div @click.stop>
          <div
            v-if="req.action == true"
            @click="toggleAction(req.device_id, req.action,req.isconnect,req.change)"
            class="cursor-pointer m-2 flex flex-shrink-0 items-center space-x-2 self-start rounded-full border border-lime-500 bg-lime-50 p-2 py-1 zfold:p-1 justify-between"
          >
            <p class="text-xs text-lime-500">&nbspON</p>
            <div class="h-4 w-4 rounded-full bg-lime-500"></div>
          </div>
          <div
            v-if="req.action == false"
            @click="toggleAction(req.device_id, req.action,req.isconnect,req.change)"
            class="cursor-pointer m-2 flex flex-shrink-0 items-center space-x-2 self-start rounded-full border border-red-500 bg-red-50 p-2 py-1 zfold:p-1 justify-between"
          >
            <div class="h-4 w-4 rounded-full bg-red-500"></div>
            <p class="text-xs text-red-500">OFF</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ref as dbRef, onValue, set } from "firebase/database";
import { database } from "../api/index";
import { useRouter } from "vue-router";
import navbar from "@/components/Nav.vue";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();

const router = useRouter();

const totalDevices = ref(0);
const deviceArr = ref([]);
const url = dbRef(database, `users/${authStore.auth?.uid}/device`);

async function getDevice() {
  try {
    onValue(url, (snapshot) => {
      const data = snapshot.val();
      deviceArr.value = data
        ? Object.keys(data).map((deviceId) => ({
            device_id: deviceId,
            action: data[deviceId]?.action,
            name: data[deviceId]?.name,
            isconnect: data[deviceId]?.isconnect,
            change: data[deviceId]?.change,
          }))
        : [];
      totalDevices.value = deviceArr.value.length;
    });
  } catch (error) {
    console.error();
  }
}

async function toggleAction(deviceId, action,connect,change) {
  try {
    if (connect && change ==='no') {
      await set(
        dbRef(database, `users/${authStore.auth?.uid}/device/${deviceId}/action`),
        !action
      );
      await set(
        dbRef(database, `users/${authStore.auth?.uid}/device/${deviceId}/change`),
        "action"
      );
    }
  } catch (error) {
    console.error(error);
  }
}

function checkOnline() {
  try {
    deviceArr.value.forEach(async (item) => {
      await set(
        dbRef(
          database,
          `users/${authStore.auth?.uid}/device/${item.device_id}/isconnect`
        ),
        false
      );
      await set(
        dbRef(
          database,
          `users/${authStore.auth?.uid}/device/${item.device_id}/change`
        ),
        "check"
      );
    });
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getDevice();
  checkOnline();
});
</script>

<style></style>
