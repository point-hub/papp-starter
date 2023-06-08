<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'
import { useBaseNotification } from '@/composable/notification'
import { TypesEnum } from '@/composable/notification'

const { notification } = useBaseNotification()
const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Basic</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-wrap gap-4">
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
