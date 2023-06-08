<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-duration'
import { useBaseNotification } from '@/composable/notification'
const { notification } = useBaseNotification()

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Duration</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-wrap gap-4">
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
    </div>
    <div
      class="card-code"
      :class="{
        'card-code-active': codeToggle,
        'card-code-inactive': !codeToggle
      }"
    >
      <div class="card-code-label">vue</div>
      <highlightjs autodetect :code="codeExample" />
    </div>
  </div>
</template>
