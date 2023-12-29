<script setup lang="ts">
import websocketConfig from '@/config/websocket'
import { jsonStringify } from '@point-hub/express-utils'
import { useWebsocketStore } from '@/stores/websocket'
import { emitter } from '@/composable/emitter'
import { ref } from 'vue'

interface IEventUserOnline {
  event: string
  user: string
  status: string
}

const messages = ref<IEventUserOnline[]>([])
emitter.on('user-online', (e) => {
  messages.value.push(e)
})

const websocket = useWebsocketStore()

const onSubmit = () => {
  if (websocket.socket?.readyState) {
    websocket.socket?.send(
      jsonStringify({
        event: 'user-online',
        user: 'user_id',
        status: 'online'
      })
    )
  }
}

const onOpen = () => {
  if (websocket.socket && websocket.socket.readyState === websocket.socket.CLOSED) {
    websocket.open(websocketConfig.url)
  }
}

const onClose = () => {
  if (websocket.socket && websocket.socket.readyState === websocket.socket.OPEN) {
    websocket.socket.close()
  }
}
</script>

<template>
  <div class="flex flex-col container mx-auto gap-4">
    <h1>Socket Example</h1>
    <div class="card">
      <div class="gap-2 flex">
        <button class="btn btn-outline-primary btn-sm" @click="onOpen()">Open Connection</button>
        <button class="btn btn-outline-danger btn-sm" @click="onClose()">Close Connection</button>
        <button class="btn btn-outline-danger btn-sm" @click="onSubmit()">Message</button>
      </div>
      <div>
        <p>Connection Status : {{ websocket.status }}</p>
        <p v-for="(message, index) in messages" :key="index">
          {{ message.event }}
        </p>
      </div>
    </div>
  </div>
</template>
