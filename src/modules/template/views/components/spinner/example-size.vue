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
    <div>
      <p>A Spinner component has various sizes.</p>
    </div>
    <div class="flex gap-4">
      <span class="spinner spinner-primary spinner-2xl" />
      <span class="spinner spinner-primary spinner-xl" />
      <span class="spinner spinner-primary spinner-lg" />
      <span class="spinner spinner-primary spinner-md" />
      <span class="spinner spinner-primary spinner-sm" />
      <span class="spinner spinner-primary spinner-xs" />
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
