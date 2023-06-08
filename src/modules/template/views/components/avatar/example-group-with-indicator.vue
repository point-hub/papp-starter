<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-group-with-indicator'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Group With Indicator</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>
        The Avatar group can be a dot attached to it. It can be used to indicate the user status.
      </p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <!-- large -->
      <div class="flex items-center justify-center text-white -space-x-4">
        <span class="avatar relative h-12 w-12">
          <img class="avatar-ring avatar-base rounded-full" src="https://via.placeholder.com/150" />
          <span class="avatar-indicator h-3 w-3 bg-primary"></span>
        </span>
        <span class="avatar relative h-12 w-12">
          <img class="avatar-ring avatar-base rounded-full" src="https://via.placeholder.com/150" />
          <span class="avatar-indicator h-3 w-3 bg-secondary"></span>
        </span>
        <span class="avatar relative h-12 w-12">
          <img class="avatar-ring avatar-base rounded-full" src="https://via.placeholder.com/150" />
          <span class="avatar-indicator h-3 w-3 bg-info"></span>
        </span>
        <span class="avatar relative h-12 w-12">
          <img class="avatar-ring avatar-base rounded-full" src="https://via.placeholder.com/150" />
          <span class="avatar-indicator h-3 w-3 bg-success"></span>
        </span>
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
