<script setup lang="ts">
import { BaseToast, useDarkMode, useScreenSize } from '@point-hub/papp'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

import { useToastStore } from '@/stores/toast.store'

const { loadDarkMode } = useDarkMode()
const toastStore = useToastStore()

const toastRef = ref()
toastStore.toastRef = toastRef

useDarkMode()
useScreenSize()

onMounted(() => {
  // set default darkmode
  loadDarkMode()
})
onBeforeUnmount(() => {})
</script>

<template>
  <RouterView />
  <component :is="BaseToast" ref="toastRef" />
</template>

<style scoped></style>
