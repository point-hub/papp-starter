<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-size'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Size</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <button class="btn btn-primary btn-xs">XS</button>
      <button class="btn btn-secondary btn-sm">SM</button>
      <button class="btn btn-info btn-md">MD</button>
      <button class="btn btn-success btn-lg">LG</button>
      <button class="btn btn-warning btn-xl">XL</button>
      <button class="btn btn-danger btn-2xl">2XL</button>
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
