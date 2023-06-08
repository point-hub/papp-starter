<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-group'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Group</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>The Avatar group renders its children as a stack.</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <!-- large -->
      <div class="flex items-center justify-center text-white -space-x-4">
        <img class="avatar-ring avatar-base rounded-full" src="https://via.placeholder.com/150" />
        <img class="avatar-ring avatar-base rounded-full" src="https://via.placeholder.com/150" />
        <img class="avatar-ring avatar-base rounded-full" src="https://via.placeholder.com/150" />
        <img class="avatar-ring avatar-base rounded-full" src="https://via.placeholder.com/150" />
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
