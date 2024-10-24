<template>
    <div class="bg-grayl2 dark:bg-grayd2 border-b border-grayl4 dark:border-grayd4 h-16 flex gap-4 p-3 items-center fixed top-0 left-0 z-50 w-full">
        <img
          src="@/assets/icon/arrow-left-s-line.svg"
          class="h-8 cursor-pointer"
          alt="Flowbite Logo"
          @click="$router.back()"
        />
        <p class="text-xl nav:text-lg dark:text-white nav:w-36 font-kanit">{{ props.title }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        Type: String
    }
})
</script>

<style>

</style>