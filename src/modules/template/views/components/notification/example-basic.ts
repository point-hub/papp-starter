export const codeExample = `<script setup lang="ts">
import { useBaseNotification } from '@/composable/notification'
import { TypesEnum } from '@/composable/notification'

const { notification } = useBaseNotification()
</script>

<template>
  <!-- default -->
  <button
    class="btn btn-primary"
    @click="
      notification(
        'Notification Title',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
      )
    "
  >
    Trigger Notification
  </button>
  <!-- info -->
  <button
    class="btn btn-info"
    @click="
      notification(
        'Notification Title',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        { type: TypesEnum.Info }
      )
    "
  >
    Trigger Notification
  </button>
  <!-- success -->
  <button
    class="btn btn-success"
    @click="
      notification(
        'Notification Title',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        { type: TypesEnum.Success }
      )
    "
  >
    Trigger Notification
  </button>
  <!-- warning -->
  <button
    class="btn btn-warning"
    @click="
      notification(
        'Notification Title',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        { type: TypesEnum.Warning }
      )
    "
  >
    Trigger Notification
  </button>
  <button
    class="btn btn-danger"
    @click="
      notification(
        'Notification Title',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
        { type: TypesEnum.Danger }
      )
    "
  >
    Trigger Notification
  </button>
<template>`
