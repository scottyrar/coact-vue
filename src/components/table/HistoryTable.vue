<template>
  <AgGridVue
    class="ag-theme-alpine"
    @gridReady="onGridReady"
    suppressDragLeaveHidesColumns
    suppressMovableColumns
    @firstDataRendered="fitColumns"
    :columnDefs="columnDefs"
    :rowData="rowData"
  ></AgGridVue>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";

const fitColumns = () => {
  gridApi.value.sizeColumnsToFit();
};

const props = defineProps({
  tableData: { type: [null, Array], required: true },
  deviceName: { type: [null, Array], required: true },
});
const emit = defineEmits(["interface"]);

const ALL_CATEGORY_COLUMN = [
  {
    headerName: "Device Name",
    field: "device_name",
    sortable: true,
    suppressSizeToFit: true,
  },
  {
    headerName: "Name",
    field: "name",
    sortable: true,
    minWidth: 200,
  },
  {
    headerName: "Date",
    field: "date",
    sortable: true,
    minWidth: 200,
  },
  {
    headerName: "Time",
    field: "time",
    sortable: true,
    minWidth: 200,
  },
  {
    headerName: "Status",
    field: "status",
    minWidth: 200,
    sortable: true,
  },
];
const gridApi = ref();
const gridColumnApi = ref();
const onGridReady = (params) => {
  gridApi.value = params.api;
  gridColumnApi.value = params.columnApi;
  fitColumns();
  emitInterface();
};

const columnDefs = ref(ALL_CATEGORY_COLUMN);

function getColumnDefinitions() {
  columnDefs.value = ALL_CATEGORY_COLUMN;
}
onBeforeMount(() => {
  getColumnDefinitions();
});

const rowData = computed(() => {
  return props.tableData?.map((data, index) => {
    return {
      device_name: props.deviceName.find(item => item.id === data.device)?.name,
      name: data.onplan ? "Plan" : "Manual",
      date: data.date,
      time: data.time,
      status: data.status,
    };
  });
});

function emitInterface() {
  emit("interface", {
    showLoading: () => gridApi.value.showLoadingOverlay(),
    hideLoading: () => gridApi.value.hideOverlay(),
  });
}
</script>

<style lang="scss" scoped>
.ag-theme-alpine {
  --ag-header-foreground-color: white;
  --ag-font-size: theme(fontSize.sm);
  :deep(.ag-root-wrapper) {
    border-radius: 8px !important;
    border: none;
  }
  --ag-font-family: "Kanit";
  @media screen and (min-width: 768px) {
    --ag-font-size: theme(fontSize.base);
  }
}

:deep(.ag-cell) {
  @media (prefers-color-scheme: dark) {
    background-color: rgba(44, 44, 46);
    color: white;
  }
}

:deep(.ag-center-cols-viewport) {
  @media (prefers-color-scheme: dark) {
    background-color: rgba(44, 44, 46);
  }
}

:deep(.ag-icon-asc) {
  color: white;
}

:deep(.ag-icon-desc) {
  color: white;
}

:deep(.ag-header-cell-resize::after) {
  background-color: theme("colors.greend");
}

:deep(.ag-header-row-column) {
  background-color: theme("colors.greend");
  color: white;
}
</style>
