<script setup lang="ts">
import { BaseToast, useDarkMode, useScreenSize, useWebsocketStore } from '@point-hub/papp'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

import websocketConfig from '@/config/websocket'
import { useToastStore } from '@/stores/toast-store'

const { loadDarkMode } = useDarkMode()
const toastStore = useToastStore()

const toastRef = ref()
toastStore.toastRef = toastRef

useDarkMode()
useScreenSize()

const { open, close } = useWebsocketStore()

onMounted(() => {
  // set default darkmode
  loadDarkMode()
  // open websocket connection
  open(websocketConfig.url)
})
onBeforeUnmount(() => {
  // close websocket connection
  close()
})
</script>

<template>
  <RouterView />
  <component :is="BaseToast" ref="toastRef" />
</template>

<style scoped></style>
