<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-disabled'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Disabled</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <button disabled class="btn btn-primary">Primary</button>
      <button disabled class="btn btn-secondary">Secondary</button>
      <button disabled class="btn btn-outline-info">Info</button>
      <button disabled class="btn btn-outline-success">Success</button>
      <button disabled class="btn btn-outline-warning">Warning</button>
      <button disabled class="btn btn-outline-danger">Danger</button>
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
