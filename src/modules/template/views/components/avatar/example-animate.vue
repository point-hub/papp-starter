<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-animate'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Animate</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>Hover the Avatar to activate slide animation.</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <!-- animate y axis -->
      <div class="flex items-center justify-center -space-x-4">
        <img
          class="avatar-ring avatar-base animate-slide-y rounded-full"
          src="https://via.placeholder.com/150"
        />
        <img
          class="avatar-ring avatar-base animate-slide-y rounded-full"
          src="https://via.placeholder.com/150"
        />
        <img
          class="avatar-ring avatar-base animate-slide-y rounded-full"
          src="https://via.placeholder.com/150"
        />
        <img
          class="avatar-ring avatar-base animate-slide-y rounded-full"
          src="https://via.placeholder.com/150"
        />
      </div>
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
