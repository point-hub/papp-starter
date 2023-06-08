<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-with-icon'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>With Icon</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <div class="badge badge-primary badge-with-icon">
        <i class="i-fas-star block"></i> <span>Button</span>
      </div>
      <div class="badge badge-secondary badge-with-icon rounded-full">
        <i class="i-fas-star block"></i> <span>Button</span>
      </div>
      <div class="badge badge-outline-primary badge-with-icon">
        <span>Button</span> <i class="i-fas-star block"></i>
      </div>
      <div class="badge badge-outline-secondary badge-with-icon rounded-full">
        <span>Button</span> <i class="i-fas-star block"></i>
      </div>
      <div class="badge badge-primary badge-icon">
        <i class="i-fas-star block"></i>
      </div>
      <div class="badge badge-outline-secondary badge-icon rounded-full">
        <i class="i-fas-star block"></i>
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
