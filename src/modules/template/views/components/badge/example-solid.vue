<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-solid'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Solid</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <div class="badge badge-primary">Primary</div>
      <div class="badge badge-secondary">Secondary</div>
      <div class="badge badge-info">Info</div>
      <div class="badge badge-success">Success</div>
      <div class="badge badge-warning">Warning</div>
      <div class="badge badge-danger">Danger</div>
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
