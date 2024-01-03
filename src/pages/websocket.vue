<script setup lang="ts">
import { emitter, useWebsocketStore } from '@point-hub/papp'
import { ref } from 'vue'

import websocketConfig from '@/config/websocket'

interface IEventUserOnline {
  event: string
  user: string
  status: string
}

const messages = ref<IEventUserOnline[]>([])
emitter.on('user-online', (e: any) => {
  messages.value.push(e)
})

const websocket = useWebsocketStore()

const onSubmit = () => {
  if (websocket.readyState()) {
    websocket.send({
      event: 'user-online',
      user: 'user_id',
      status: 'online'
    })
  }
}

const onOpen = () => {
  if (websocket && websocket.isClosed()) {
    websocket.open(websocketConfig.url)
  }
}

const onClose = () => {
  if (websocket.socket && websocket.isOpen()) {
    websocket.close()
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
