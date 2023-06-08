<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-rounded'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Rounded</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>Buttons can have a rounded shape</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <div class="avatar avatar-2xl">
        <img class="rounded-lg" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-xl">
        <img class="rounded-lg" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-lg">
        <img class="rounded-lg" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-base">
        <img class="rounded-lg" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-sm">
        <img class="rounded-lg" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-xs">
        <img class="rounded-lg" src="https://via.placeholder.com/150" />
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
