<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-indicator'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Indicator</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>Avatars can be a dot attached to it. It can be used to indicate the user status.</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <span class="avatar avatar-2xl relative">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
        <span class="avatar-indicator h-7 w-7 bg-primary"></span>
      </span>
      <span class="avatar avatar-xl relative">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
        <span class="avatar-indicator h-6 w-6 bg-secondary"></span>
      </span>
      <span class="avatar avatar-lg relative">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
        <span class="avatar-indicator h-5 w-5 bg-info"></span>
      </span>
      <span class="avatar avatar-base relative">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
        <span class="avatar-indicator h-4 w-4 bg-success"></span>
      </span>
      <span class="avatar avatar-sm relative">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
        <span class="avatar-indicator h-3 w-3 bg-warning"></span>
      </span>
      <span class="avatar avatar-xs relative">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
        <span class="avatar-indicator h-3 w-3 bg-danger"></span>
      </span>
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
