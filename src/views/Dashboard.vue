<template>
  <!-- <Header title="Dashboard" /> -->
  <Nav />
  <div class="pt-20 p-3 space-y-3">
    <div class="flex justify-end">
      <vue-select
        class="dropdown w-64"
        :placeholder="'Enter Here'"
        :options="deviceNameList"
        :getOptionLabel="(option) => option.name"
        :reduce="(option) => option.id"
        :clearable="true"
        :searchable="true"
        v-model="deviceName"
      />
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="rounded-[20px] bg-[#F1F7FF] shadow-xl p-3 col-span-2 laptop:col-span-1">
        <apexchart
          type="bar"
          height="350"
          :series="series1"
          :options="quarterOptions1"
        ></apexchart>
      </div>
      <div class="rounded-[20px] bg-[#F1F7FF] shadow-xl p-3 col-span-2 laptop:col-span-1">
        <apexchart
          type="bar"
          height="350"
          :series="series2"
          :options="quarterOptions2"
        ></apexchart>
      </div>
      <div class="rounded-[20px] bg-[#F1F7FF] shadow-xl p-3 col-span-2 laptop:col-span-1">
        <apexchart
          type="bar"
          height="350"
          :series="series3"
          :options="quarterOptions3"
        ></apexchart>
      </div>
      <div class="rounded-[20px] bg-[#F1F7FF] shadow-xl p-3 col-span-2 laptop:col-span-1">
        <apexchart
          type="bar"
          height="350"
          :series="series4"
          :options="quarterOptions4"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Nav from "../components/Nav.vue";
import { ref, onMounted, onBeforeMount, watch } from "vue";
import { ref as dbRef, get, set } from "firebase/database";
import { database } from "../api/index";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();

const currentDate = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentMonth = monthNames[currentDate.getMonth()];
const currentYear = currentDate.getFullYear();
const formattedDate = `Quarter1, ${currentYear}`;

const deviceNameList = ref([]);
const deviceName = ref(null);
const history = ref([]);

const series1 = ref([
  {
    name: "On",
    data: [],
  },
  {
    name: "Off",
    data: [],
  },
  {
    name: "Plan",
    data: [],
  },
]);
const series2 = ref([
  {
    name: "On",
    data: [],
  },
  {
    name: "Off",
    data: [],
  },
  {
    name: "Plan",
    data: [],
  },
]);
const series3 = ref([
  {
    name: "On",
    data: [],
  },
  {
    name: "Off",
    data: [],
  },
  {
    name: "Plan",
    data: [],
  },
]);
const series4 = ref([
  {
    name: "On",
    data: [],
  },
  {
    name: "Off",
    data: [],
  },
  {
    name: "Plan",
    data: [],
  },
]);
const quarterOptions1 = {
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  title: {
    text: "Quarter1",
    align: "left",
    margin: 40,
    offsetX: 0,
    offsetY: 0,
    floating: true,
    style: {
      fontSize: "20px",
      fontWeight: "medium",
      fontFamily: undefined,
      color: "#1D2B46",
    },
  },
  colors: ["#0FB87B", "#F49287", "#60a5fa"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: 15,
      borderRadius: 7,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["January", "February", "March"],
  },
  yaxis: {
    min: 0,
    tickAmount: 5,
    // max: 200,
    labels: {
      formatter: function (val) {
        return Math.abs(Math.round(val)) + " times";
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: true,
  },

  legend: {
    position: "top",
    horizontalAlign: "right",
    fontSize: "12px",
    markers: {
      radius: 12,
      width: 15,
      height: 15,
      offsetX: 0,
      offsetY: 3,
    },
  },
};
const quarterOptions2 = {
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  title: {
    text: "Quarter2",
    align: "left",
    margin: 40,
    offsetX: 0,
    offsetY: 0,
    floating: true,
    style: {
      fontSize: "20px",
      fontWeight: "medium",
      fontFamily: undefined,
      color: "#1D2B46",
    },
  },
  colors: ["#0FB87B", "#F49287", "#60a5fa"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: 15,
      borderRadius: 7,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["April", "May", "June"],
  },
  yaxis: {
    min: 0,
    tickAmount: 5,
    // max: 200,
    labels: {
      formatter: function (val) {
        return Math.abs(Math.round(val)) + " times";
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: true,
  },

  legend: {
    position: "top",
    horizontalAlign: "right",
    fontSize: "12px",
    markers: {
      radius: 12,
      width: 15,
      height: 15,
      offsetX: 0,
      offsetY: 3,
    },
  },
};
const quarterOptions3 = {
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  title: {
    text: "Quarter3",
    align: "left",
    margin: 40,
    offsetX: 0,
    offsetY: 0,
    floating: true,
    style: {
      fontSize: "20px",
      fontWeight: "medium",
      fontFamily: undefined,
      color: "#1D2B46",
    },
  },
  colors: ["#0FB87B", "#F49287", "#60a5fa"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: 15,
      borderRadius: 7,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["July", "August", "September"],
  },
  yaxis: {
    min: 0,
    tickAmount: 5,
    // max: 200,
    labels: {
      formatter: function (val) {
        return Math.abs(Math.round(val)) + " times";
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: true,
  },

  legend: {
    position: "top",
    horizontalAlign: "right",
    fontSize: "12px",
    markers: {
      radius: 12,
      width: 15,
      height: 15,
      offsetX: 0,
      offsetY: 3,
    },
  },
};
const quarterOptions4 = {
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  title: {
    text: "Quarter4",
    align: "left",
    margin: 40,
    offsetX: 0,
    offsetY: 0,
    floating: true,
    style: {
      fontSize: "20px",
      fontWeight: "medium",
      fontFamily: undefined,
      color: "#1D2B46",
    },
  },
  colors: ["#0FB87B", "#F49287", "#60a5fa"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: 15,
      borderRadius: 7,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["October", "November", "December"],
  },
  yaxis: {
    min: 0,
    tickAmount: 5,
    // max: 200,
    labels: {
      formatter: function (val) {
        return Math.abs(Math.round(val)) + " times";
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: true,
  },

  legend: {
    position: "top",
    horizontalAlign: "right",
    fontSize: "12px",
    markers: {
      radius: 12,
      width: 15,
      height: 15,
      offsetX: 0,
      offsetY: 3,
    },
  },
};

async function getHistory() {
  try {
    const snapshot = await get(
      dbRef(database, `users/${authStore.auth?.uid}/history`)
    );
    snapshot.forEach((childSnapshot) => {
      history.value.push({
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
      deviceNameList.value.push({
        id: childSnapshot.key,
        name: childSnapshot.val().name
      });
    });
    console.log(deviceNameList.value);
  } catch (error) {
    console.error();
  }
}

function getQuarter1() {
  const onLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 1 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 1 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 1 && item.device === deviceName.value && item.onplan;
  });
  const onLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 2 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 2 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 2 && item.device === deviceName.value && item.onplan;
  });
  const onLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 3 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 3 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 3 && item.device === deviceName.value && item.onplan;
  });
  if (
    onLength1.length === 0 &&
    onLength2.length === 0 &&
    onLength3.length === 0
  ) {
    series1.value[0].data = [];
  } else {
    series1.value[0].data = [
      onLength1.length,
      onLength2.length,
      onLength3.length,
    ];
  }

  if (
    offLength1.length === 0 &&
    offLength2.length === 0 &&
    offLength3.length === 0
  ) {
    series1.value[1].data = [];
  } else {
    series1.value[1].data = [
      offLength1.length,
      offLength2.length,
      offLength3.length,
    ];
  }

  if (
    planLength1.length === 0 &&
    planLength2.length === 0 &&
    planLength3.length === 0
  ) {
    series1.value[2].data = [];
  } else {
    series1.value[2].data = [
      planLength1.length,
      planLength2.length,
      planLength3.length,
    ];
  }
}

function getQuarter2() {
  const onLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 4 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 4 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 4 && item.device === deviceName.value && item.onplan;
  });
  const onLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 5 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const offLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 5 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 5 && item.device === deviceName.value && item.onplan;
  });
  const onLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 6 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 6 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 6 && item.device === deviceName.value && item.onplan;
  });
  if (
    onLength1.length === 0 &&
    onLength2.length === 0 &&
    onLength3.length === 0
  ) {
    series2.value[0].data = [];
  } else {
    series2.value[0].data = [
      onLength1.length,
      onLength2.length,
      onLength3.length,
    ];
  }

  if (
    offLength1.length === 0 &&
    offLength2.length === 0 &&
    offLength3.length === 0
  ) {
    series2.value[1].data = [];
  } else {
    series2.value[1].data = [
      offLength1.length,
      offLength2.length,
      offLength3.length,
    ];
  }

  if (
    planLength1.length === 0 &&
    planLength2.length === 0 &&
    planLength3.length === 0
  ) {
    series2.value[2].data = [];
  } else {
    series2.value[2].data = [
      planLength1.length,
      planLength2.length,
      planLength3.length,
    ];
  }
}

function getQuarter3() {
  const onLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 7 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 7 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 7 && item.device === deviceName.value && item.onplan;
  });
  const onLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 8 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 8 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 8 && item.device === deviceName.value && item.onplan;
  });
  const onLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 9 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 9 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 9 && item.device === deviceName.value && item.onplan;
  });
  if (
    onLength1.length === 0 &&
    onLength2.length === 0 &&
    onLength3.length === 0
  ) {
    series3.value[0].data = [];
  } else {
    series3.value[0].data = [
      onLength1.length,
      onLength2.length,
      onLength3.length,
    ];
  }

  if (
    offLength1.length === 0 &&
    offLength2.length === 0 &&
    offLength3.length === 0
  ) {
    series3.value[1].data = [];
  } else {
    series3.value[1].data = [
      offLength1.length,
      offLength2.length,
      offLength3.length,
    ];
  }

  if (
    planLength1.length === 0 &&
    planLength2.length === 0 &&
    planLength3.length === 0
  ) {
    series3.value[2].data = [];
  } else {
    series3.value[2].data = [
      planLength1.length,
      planLength2.length,
      planLength3.length,
    ];
  }
}

function getQuarter4() {
  const onLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 10 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 10 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength1 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 10 && item.device === deviceName.value && item.onplan;
  });
  const onLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 11 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 11 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength2 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 11 && item.device === deviceName.value && item.onplan;
  });
  const onLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 12 && item.device === deviceName.value && item.status === "On"
    );
  });
  const offLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return (
      month === 12 && item.device === deviceName.value && item.status === "Off"
    );
  });
  const planLength3 = history.value.filter((item) => {
    const dateParts = item.date.split("-");
    const month = parseInt(dateParts[1]);
    return month === 12 && item.device === deviceName.value && item.onplan;
  });
  if (
    onLength1.length === 0 &&
    onLength2.length === 0 &&
    onLength3.length === 0
  ) {
    series4.value[0].data = [];
  } else {
    series4.value[0].data = [
      onLength1.length,
      onLength2.length,
      onLength3.length,
    ];
  }

  if (
    offLength1.length === 0 &&
    offLength2.length === 0 &&
    offLength3.length === 0
  ) {
    series4.value[1].data = [];
  } else {
    series4.value[1].data = [
      offLength1.length,
      offLength2.length,
      offLength3.length,
    ];
  }

  if (
    planLength1.length === 0 &&
    planLength2.length === 0 &&
    planLength3.length === 0
  ) {
    series4.value[2].data = [];
  } else {
    series4.value[2].data = [
      planLength1.length,
      planLength2.length,
      planLength3.length,
    ];
  }
}

watch(deviceName, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    getQuarter1();
    getQuarter2();
    getQuarter3();
    getQuarter4();
  }
});

onBeforeMount(() => {
  getAllDevice();
  getHistory();
});
</script>

<style lang="scss" scoped>
.dropdown {
  :deep(.vs__search::placeholder),
  :deep(.vs__dropdown-toggle) {
    background-color: #f2f3f7;
    border: none;
    border-radius: 5px;
    height: 40px;
    padding-right: 8px;
    font-size: 14px;
    --tw-text-opacity: 1;
    color: black;
  }

  :deep(.vs__search) {
    font-size: 14px;
    padding: 5px 8px 5px 8px;
  }

  :deep(.vs__selected) {
    padding-left: 8px;
  }

  :deep(.vs__open-indicator) {
    fill: #232325;
  }

  :deep(.vs__dropdown-menu) {
    font-size: 14px;
  }
}
</style>
