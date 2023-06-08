<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-block'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Block</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <button class="btn btn-primary btn-block">Primary</button>
      <button class="btn btn-block btn-secondary">Secondary</button>
      <button class="btn btn-block btn-info">Info</button>
      <button class="btn btn-block btn-success">Success</button>
      <button class="btn btn-block btn-warning">Warning</button>
      <button class="btn btn-block btn-danger">Danger</button>
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
