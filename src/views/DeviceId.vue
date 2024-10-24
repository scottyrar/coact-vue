<template>
  <Header title="Device" />
  <div class="p-3 space-y-3 !pt-20">
    <div class="flex flex-wrap gap-2 justify-between items-center">
      <div class="flex gap-2 items-center">
        <p
          class="hide:text-xl text-2xl zfold:text-base font-semibold dark:text-white font-kanit"
        >
          Name :
        </p>
        <input
          type="text"
          class="hide:text-xl text-2xl zfold:text-base font-semibold dark:text-white font-kanit bg-transparent"
          :disabled="editBool"
          v-model="deviceArr.name"
        />
      </div>
      <button @click="editName" class="rounded-lg p-3 bg-greend dark:bg-greend text-black dark:text-white font-kanit">{{ editBool ? 'Edit' : 'Submit' }}</button>
    </div>
    <div class="grid grid-cols-3">
      <button
        class="bg-grayl3 dark:bg-grayd4 bg-opacity-90 rounded-xl grid content-center shadow-xl border-l-4 border-greenl dark:border-greend h-20 hide:h-16 zfold:h-12 disabled:cursor-not-allowed disabled:opacity-30 col-span-3 laptop:col-span-1"
        :disabled="deviceArr.plans?.length === 5"
        @click="modalType = 'add'"
      >
        <div class="m-2">
          <div class="flex gap-4">
            <img
              src="@/assets/icon/add-circle-outline.svg"
              class="w-12 self-center rounded-full my-2"
            />
            <div class="grid grid-rows-2 basis-11/12">
              <p
                class="laptop:text-base zfold:text-xs text-grayd5 dark:text-gray-400 grid content-end font-kanit text-start"
              >
                click here
              </p>
              <p
                class="laptop:text-xl zfold:text-base font-semibold dark:text-white font-kanit text-start"
              >
                Add Plans
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div
        v-for="(req, index) in deviceArr.plans"
        class="bg-grayl4 dark:bg-grayd3 bg-opacity-90 rounded-xl flex flex-wrap justify-between items-start gap-2 p-3 shadow-xl border-l-4 border-greenl dark:border-greend cursor-pointer hover:opacity-70 col-span-2 laptop:col-span-1"
        @click="editModal(index)"
      >
        <div class="text-black dark:text-white space-y-2 font-kanit">
          <p class="text-xl">Name : {{ req.name }}</p>
          <p>Day : {{ req.day }}</p>
          <p>
            Time_Start : {{ String(req.hour_start).padStart(2, "0") }}:{{
              String(req.min_start).padStart(2, "0")
            }}
          </p>
          <p>
            Time_End : {{ String(req.hour_end).padStart(2, "0") }}:{{
              String(req.min_end).padStart(2, "0")
            }}
          </p>
        </div>
        <div class="flex gap-2" @click.stop>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="req.status"
              @change="toggleOn(index, req.status)"
              class="sr-only peer"
            />
            <div
              class="relative w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-greenl"
            ></div>
          </label>
          <button class="p-1 bg-grayl5 dark:bg-grayd2 rounded-lg" @click="deletePlan(index)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(250,0,0,1)"
              class="w-6"
            >
              <path
                d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <BaseDialog :showModal="modalType === 'add' || modalType === 'edit'">
    <div class="space-y-4 p-3">
      <p class="text-2xl dark:text-white text-black font-kanit">
        {{ modalType === "add" ? "Create Plan" : "Edit Plan" }}
      </p>
      <input
        type="text"
        placeholder="Enter your planname"
        class="w-full text-black dark:text-white p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-700 dark:border-gray-200"
        v-model.trim="nameInput"
      />
      <div class="grid grid-cols-2 gap-4 w-full">
        <div class="col-span-2 laptop:col-span-1">
          <p class="dark:text-white text-black font-kanit">Time Start</p>
          <div
            class="flex bg-white border-spacing-1 border border-[#EAEAEA] rounded-lg p-2 w-full justify-between items-center"
          >
            <div class="flex -mr-2">
              <Dropdown
                v-model="hourStart"
                :options="hour"
                optionLabel="label"
                optionValue="value"
                placeholder="00"
                :virtualScrollerOptions="{
                  itemSize: 30,
                  class:
                    'text-sm bg-white mt-[11px] border border-[#EAEAEA] rounded-lg text-center w-16',
                }"
                :style="{
                  textAlign: 'center',
                  backgroundColor: 'white',
                  width: '64px',
                }"
              />
            </div>
            <p class="align-bottom text-sm pb-1">:</p>
            <div class="flex -ml-2">
              <Dropdown
                v-model="minStart"
                :options="minute"
                optionLabel="label"
                optionValue="value"
                placeholder="00"
                :virtualScrollerOptions="{
                  itemSize: 30,
                  class:
                    'text-sm bg-white mt-[11px] border border-[#EAEAEA] rounded-lg text-center w-16',
                }"
                :style="{
                  textAlign: 'center',
                  backgroundColor: 'white',
                  width: '64px',
                }"
              />
            </div>
          </div>
        </div>
        <div class="col-span-2 laptop:col-span-1">
          <p class="dark:text-white text-black font-kanit">Time Start</p>
          <div
            class="flex bg-white border-spacing-1 border border-[#EAEAEA] rounded-lg p-2 w-full justify-between items-center"
          >
            <div class="flex -mr-2">
              <Dropdown
                v-model="hourEnd"
                :options="hour"
                optionLabel="label"
                optionValue="value"
                placeholder="00"
                :virtualScrollerOptions="{
                  itemSize: 30,
                  class:
                    'text-sm bg-white mt-[11px] border border-[#EAEAEA] rounded-lg text-center w-16',
                }"
                :style="{
                  textAlign: 'center',
                  backgroundColor: 'white',
                  width: '64px',
                }"
              />
            </div>
            <p class="align-bottom text-sm pb-1">:</p>
            <div class="flex -ml-2">
              <Dropdown
                v-model="minEnd"
                :options="minute"
                optionLabel="label"
                optionValue="value"
                placeholder="00"
                :virtualScrollerOptions="{
                  itemSize: 30,
                  class:
                    'text-sm bg-white mt-[11px] border border-[#EAEAEA] rounded-lg text-center w-16',
                }"
                :style="{
                  textAlign: 'center',
                  backgroundColor: 'white',
                  width: '64px',
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          class="p-2 w-12 h-12 rounded-full border-2 border-yellow-400"
          :class="{
            'bg-yellow-400': date.includes('Mon'),
            'bg-white dark:bg-gray-800': !date.includes('Mon'),
          }"
          @click="addDate('Mon')"
        >
          <p class="dark:text-white text-black font-kanit">Mon</p>
        </button>
        <button
          class="p-2 w-12 h-12 rounded-full border-2 border-pink-400"
          :class="{
            'bg-pink-400': date.includes('Tue'),
            'bg-white dark:bg-gray-800': !date.includes('Tue'),
          }"
          @click="addDate('Tue')"
        >
          <p class="dark:text-white text-black font-kanit">Tue</p>
        </button>
        <button
          class="p-2 w-12 h-12 rounded-full border-2 border-green-400"
          :class="{
            'bg-green-400': date.includes('Wed'),
            'bg-white dark:bg-gray-800': !date.includes('Wed'),
          }"
          @click="addDate('Wed')"
        >
          <p class="dark:text-white text-black font-kanit">Wed</p>
        </button>
        <button
          class="p-2 w-12 h-12 rounded-full border-2 border-orange-400"
          :class="{
            'bg-orange-400': date.includes('Thu'),
            'bg-white dark:bg-gray-800': !date.includes('Thu'),
          }"
          @click="addDate('Thu')"
        >
          <p class="dark:text-white text-black font-kanit">Thu</p>
        </button>
        <button
          class="p-2 w-12 h-12 rounded-full border-2 border-blue-400"
          :class="{
            'bg-blue-400': date.includes('Fri'),
            'bg-white dark:bg-gray-800': !date.includes('Fri'),
          }"
          @click="addDate('Fri')"
        >
          <p class="dark:text-white text-black font-kanit">Fri</p>
        </button>
        <button
          class="p-2 w-12 h-12 rounded-full border-2 border-purple-400"
          :class="{
            'bg-purple-400': date.includes('Sat'),
            'bg-white dark:bg-gray-800': !date.includes('Sat'),
          }"
          @click="addDate('Sat')"
        >
          <p class="dark:text-white text-black font-kanit">Sat</p>
        </button>
        <button
          class="p-2 w-12 h-12 rounded-full border-2 border-red-400"
          :class="{
            'bg-red-400': date.includes('Sun'),
            'bg-white dark:bg-gray-800': !date.includes('Sun'),
          }"
          @click="addDate('Sun')"
        >
          <p class="dark:text-white text-black font-kanit">Sun</p>
        </button>
      </div>
      <div class="flex gap-2 items-center">
        <input type="checkbox" v-model="allDay" @change="toggleDate" />
        <p class="dark:text-white text-black font-kanit">Selected All Day</p>
      </div>
      <div class="flex flex-wrap gap-2 justify-center">
        <button
          class="bg-gray-500 p-3 rounded-lg text-white font-kanit"
          @click="cancelModal"
        >
          Cancel
        </button>
        <button
          class="bg-lime-500 p-3 rounded-lg text-white font-kanit disabled:opacity-30 disabled:cursor-not-allowed"
          @click="confirmModal"
          :disabled="!nameInput || date.length === 0"
        >
          Confirm
        </button>
      </div>
    </div>
  </BaseDialog>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { ref as dbRef, onValue, set } from "firebase/database";
import { database } from "../api/index";
import { useAuthStore } from "../stores/auth";
import Header from "../components/Header.vue";
import BaseDialog from "../components/BaseDialog.vue";
import Dropdown from "primevue/dropdown";

const authStore = useAuthStore();
const route = useRoute();
const modalType = ref("");
const nameInput = ref("");
const hourStart = ref(0);
const minStart = ref(0);
const hourEnd = ref(0);
const minEnd = ref(0);
const date = ref([]);
const allDay = ref(false);
const dbIndex = ref(0);

const deviceArr = ref([]);
const url = dbRef(
  database,
  `users/${authStore.auth?.uid}/device/${route.params.id}`
);

const hour = ref(
  Array.from({ length: 24 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i,
  }))
);

const minute = ref(
  Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i,
  }))
);

const addDate = (dayToAdd) => {
  const isMonInArray = date.value.includes(dayToAdd);
  if (isMonInArray) {
    const updatedDate = date.value.filter((day) => day !== dayToAdd);
    date.value = updatedDate;
  } else {
    date.value = [...date.value, dayToAdd];
  }
};

async function getPlan() {
  try {
    onValue(url, (snapshot) => {
      const data = snapshot.val();
      deviceArr.value = data;
    });
  } catch (error) {
    console.error();
  }
}

function cancelModal() {
  modalType.value = "";
  nameInput.value = "";
  hourStart.value = "";
  hourEnd.value = "";
  minStart.value = "";
  minEnd.value = "";
  date.value = [];
  allDay.value = false;
  dbIndex.value = 0;
}

function editModal(index) {
  modalType.value = "edit";
  nameInput.value = deviceArr.value.plans[index].name;
  minStart.value = deviceArr.value.plans[index].min_start;
  minEnd.value = deviceArr.value.plans[index].min_end;
  hourStart.value = deviceArr.value.plans[index].hour_start;
  hourEnd.value = deviceArr.value.plans[index].hour_end;
  date.value = deviceArr.value.plans[index].day.split(",");
  dbIndex.value = index;
}

function confirmModal() {
  try {
    if (modalType.value === "edit") {
      set(
        dbRef(
          database,
          `users/${authStore.auth?.uid}/device/${route.params.id}/plans/${dbIndex.value}`
        ),
        {
          name: nameInput.value,
          day: date.value.join(","),
          hour_start: hourStart.value,
          hour_end: hourEnd.value,
          min_start: minStart.value,
          min_end: minEnd.value,
          status: deviceArr.value.plans[dbIndex.value].status,
        }
      );
    } else {
      set(
        dbRef(
          database,
          `users/${authStore.auth?.uid}/device/${route.params.id}/plans`
        ),
        [
          ...deviceArr.value.plans,
          {
            name: nameInput.value,
            day: date.value.join(","),
            hour_start: hourStart.value,
            hour_end: hourEnd.value,
            min_start: minStart.value,
            min_end: minEnd.value,
            status: true,
          },
        ]
      );
    }
    set(
      dbRef(
        database,
        `users/${authStore.auth?.uid}/device/${route.params.id}/change`
      ),
      "plan"
    );
    cancelModal();
  } catch (error) {
    console.log(error);
  }
}

function toggleOn(index, value) {
  console.log(index);
  set(
    dbRef(
      database,
      `users/${authStore.auth?.uid}/device/${route.params.id}/plans/${index}/status`
    ),
    value
  );
  set(
    dbRef(
      database,
      `users/${authStore.auth?.uid}/device/${route.params.id}/change`
    ),
    "plan"
  );
}

const editBool = ref(true);
function editName() {
  try {
    if (editBool.value) {
      editBool.value = false;
    } else {
      set(
        dbRef(
          database,
          `users/${authStore.auth?.uid}/device/${route.params.id}/name`
        ),
        deviceArr.value.name
      );
      editBool.value = true;
    }
  } catch (error) {
    console.log(error);
  }
}

function deletePlan(index) {
  const planArr = deviceArr.value.plans;
  planArr.splice(index, 1);
  set(
    dbRef(
      database,
      `users/${authStore.auth?.uid}/device/${route.params.id}/plans`
    ),
    planArr
  );
  set(
    dbRef(
      database,
      `users/${authStore.auth?.uid}/device/${route.params.id}/change`
    ),
    "plan"
  );
}

function toggleDate() {
  if (allDay.value === true) {
    date.value = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  } else {
    date.value = [];
  }
}

watch(date, () => {
  if (date.value.length === 7) {
    allDay.value = true;
  } else {
    allDay.value = false;
  }
});

onMounted(() => {
  getPlan();
});
</script>

<style lang="scss" scoped>
:deep(.p-dropdown-trigger) {
  display: none;
}

:deep(.p-dropdown) {
  border: none;
  background-color: #f6f6f6;
  padding: 0;
}
:deep(.p-dropdown-label.p-inputtext) {
  padding: 0 15px;
  font-size: 12px;
  box-shadow: none;
  color: black;
}

.p-dropdown-panel {
  :deep(.p-dropdown-items-wrapper) {
    :deep(.p-virtualscroller) {
      :deep(.p-dropdown-items) {
        background-color: red;
      }
    }
  }
}

:deep(.p-dropdown:not(.p-disable).p-focus) {
  outline: none;
  border: 0;
  border-color: transparent;
  box-shadow: none;
}
</style>
