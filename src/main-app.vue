<script setup lang="ts">
import { RouterView } from 'vue-router'
import websocketConfig from '@/config/websocket'
import { useWebsocketStore } from '@/stores/websocket'
import { onBeforeUnmount, onMounted } from 'vue'

const { open, close } = useWebsocketStore()
// handshake to websockets
onMounted(() => {
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
