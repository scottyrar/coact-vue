<template>
  <div class="h-screen">
    <!-- <Header title="History" /> -->
    <Nav />
    <div class="!pt-20 p-3">
      <div class="h-[85vh] overflow-y-auto">
        <HistoryTable
          class="w-full h-full"
          :table-data="rowData"
          :deviceName="deviceNameList"
          @interface="getColumnTableInterface"
        ></HistoryTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from "../components/Nav.vue";
import HistoryTable from "../components/table/HistoryTable.vue";
import { onMounted, ref } from "vue";
import { ref as dbRef, get, set } from "firebase/database";
import { database } from "../api/index";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();

const ColumnTableFunction = ref({
  showLoading: () => {},
  hideLoading: () => {},
});

function getColumnTableInterface(childInterface) {
  ColumnTableFunction.value = childInterface;
}

const rowData = ref([]);
const deviceNameList = ref([]);

const url = dbRef(database, `users/${authStore.auth?.uid}/history`);

async function getPlan() {
  try {
    const snapshot = await get(url);
    snapshot.forEach((childSnapshot) => {
      rowData.value.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });
  } catch (error) {
    console.error();
  }
}

async function getAllDevice() {
    try {
      const snapshot = await get(
        dbRef(database, `users/${authStore.auth?.uid}/device`)
      );
      snapshot.forEach((childSnapshot) => {
        deviceNameList.value.push(
          {
            id: childSnapshot.key,
            name: childSnapshot.val().name
          }
        );
      });
    } catch (error) {
      console.error();
    }
  }

onMounted(() => {
  getPlan();
  getAllDevice();
});
</script>

<style></style>
