import { ref } from 'vue'
import { defineStore } from 'pinia'
import websocketConfig from '@/config/websocket'
import { emitter } from '@/composable/emitter'
import { jsonParse } from '@point-hub/express-utils'

export const useWebsocketStore = defineStore('websocket', () => {
  const socket = ref<WebSocket>()
  const reconnectingStatus = ref(false)
  const reconnectingTry = ref(0)
  const reconnectingMaxTry = ref(10)
  const reconnectingInterval = ref(1000)
  const status = ref(0)

  const reconnect = () => {
    reconnectingStatus.value = true
    reconnectingTry.value++
    reconnectingInterval.value += reconnectingTry.value * 1000

    if (socket.value?.readyState === socket.value?.CLOSING) {
      setTimeout(reconnect, reconnectingInterval.value)
      return
    }
    if (socket.value?.readyState === socket.value?.CONNECTING) {
      setTimeout(reconnect, reconnectingInterval.value)
      return
    }
    if (socket.value?.readyState === socket.value?.OPEN) {
      reconnectingStatus.value = false
      reconnectingTry.value = 0
      return
    }
    open(websocketConfig.url)

    if (reconnectingTry.value < reconnectingMaxTry.value) {
      setTimeout(reconnect, reconnectingInterval.value)
    }
  }

  const open = (socketUrl: string) => {
    socket.value = new WebSocket(socketUrl)
    // message is received
    socket.value.onmessage = (event) => {
      const data = jsonParse(event.data)
      emitter.emit(data.event, data)
      console.log('message', event)
    }
    // socket opened
    socket.value.onopen = (event) => {
      console.log('open', event)
      status.value = 1
    }
    // socket closed
    socket.value.onclose = (event) => {
      console.log('close', event)
      status.value = 0
      if (reconnectingStatus.value === false) {
        setTimeout(reconnect, reconnectingInterval.value)
      }
    }
    // error handler
    socket.value.onerror = (event) => {
      console.log('error', event)
    }
  }

  function close() {
    socket.value?.close()
  }

  return { socket, open, close, status }
})
