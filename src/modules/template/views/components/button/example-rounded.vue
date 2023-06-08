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
    <div class="flex flex-wrap items-center gap-2">
      <button class="btn btn-primary rounded-full">Primary</button>
      <button class="btn btn-secondary rounded-full">Secondary</button>
      <button class="btn btn-info rounded-full">Info</button>
      <button class="btn btn-success rounded-full">Success</button>
      <button class="btn btn-warning rounded-full">Warning</button>
      <button class="btn btn-danger rounded-full">Danger</button>
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
