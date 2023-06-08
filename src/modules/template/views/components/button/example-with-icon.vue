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
      <button class="btn btn-primary btn-with-icon">
        <i class="i-fas-user block"></i> <span>Button</span>
      </button>
      <button class="btn btn-secondary btn-with-icon rounded-full">
        <i class="i-fas-user block"></i> <span>Button</span>
      </button>
      <button class="btn btn-outline-primary btn-with-icon">
        <span>Button</span> <i class="i-fas-user block"></i>
      </button>
      <button class="btn btn-outline-secondary btn-with-icon rounded-full">
        <span>Button</span> <i class="i-fas-user block"></i>
      </button>
      <button class="btn btn-primary btn-icon">
        <i class="i-fas-user block"></i>
      </button>
      <button class="btn btn-outline-secondary btn-icon rounded-full">
        <i class="i-fas-user block"></i>
      </button>
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
