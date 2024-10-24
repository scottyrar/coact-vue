<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="props.showModal"
        class="fixed top-0 left-0 w-screen overflow-y-auto flex justify-center h-screen bg-opacity-50 bg-black z-10 p-5"
        ref="divRef"
      >
        <div
          class="bg-white dark:bg-gray-800 p-5 rounded-xl h-fit"
          ref="modalRef"
          :style="modalWidth"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
 
<script setup>
import { ref, watch, computed, onMounted } from "vue";
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  size: {
    type: String,
    default: "M",
  },
  expand: {
    type: Boolean,
    default: false,
  },
});
 
const modalWidth = computed(() => {
  switch (props.size) {
    case "S":
      return { "max-width": "300px" };
    case "M":
      return { "max-width": "500px" };
    case "L":
      return { "max-width": "800px" };
    case "XL":
      return { "max-width": "100%" };
    default:
      return { "max-width": "500px" };
  }
});
 
const modalRef = ref(null);
const divRef = ref(null);
// const modalHeight = ref(null)
 
const centerContent = () => {
  const modal = modalRef.value;
  const div = divRef.value;
  if (modalRef.value !== null && divRef.value !== null) {
    const modalHeight = modal.offsetHeight;
    const divHeight = div.offsetHeight;
    if (modalHeight >= divHeight) {
      div.style.alignItems = "start";
    } else {
      div.style.alignItems = "center";
    }
  }
};
 
watch(
  [modalRef, divRef],
  ([newModalRef, newDivRef], [oldModalRef, oldDivRef]) => {
    if (newModalRef !== oldModalRef || newDivRef !== oldDivRef) {
      centerContent();
    }
  }
);
 
watch(
  () => props.expand,
  (newValue) => {
    if (newValue === true) {
      setTimeout(() => {
        centerContent();
      }, 100);
    }
  }
);
 
onMounted(() => {
  window.addEventListener("resize", centerContent);
});
</script>
 
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>