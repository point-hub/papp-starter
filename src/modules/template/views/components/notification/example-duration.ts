export const codeExample = `<script setup lang="ts">
import { useBaseNotification } from '@/composable/notification'

const { notification } = useBaseNotification()
</script>

<template>
  <!-- default -->
  <button
    class="btn btn-primary"
    @click="
      notification(
        'Notification Title',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. ',
        { duration: 10000 }
      )
    "
  >
    10000 milisecond / 10 second
  </button>
<template>`
