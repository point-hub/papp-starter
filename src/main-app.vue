<script setup lang="ts">
import { useDarkMode, useScreenSize, useWebsocketStore } from '@point-hub/papp'
import { onBeforeUnmount, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import websocketConfig from '@/config/websocket'

const { loadDarkMode } = useDarkMode()

useDarkMode()
useScreenSize()

const { open, close } = useWebsocketStore()
// handshake to websockets
onMounted(() => {
  loadDarkMode()
  open(websocketConfig.url)
})
// close websocket when leave application
onBeforeUnmount(() => {
  close()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
