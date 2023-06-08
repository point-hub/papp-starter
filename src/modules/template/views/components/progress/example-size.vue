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
      <p>The Progress components can have various sizes.</p>
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <div class="progress-xs progress-container">
        <div class="progress-bar progress-primary w-10%"></div>
      </div>
      <div class="progress-container progress-sm">
        <div class="progress-bar progress-primary w-20%"></div>
      </div>
      <div class="progress-container progress-md">
        <div class="progress-bar progress-primary w-30%"></div>
      </div>
      <div class="progress-lg progress-container">
        <div class="progress-bar progress-primary w-40%"></div>
      </div>
      <div class="progress-xl progress-container">
        <div class="progress-bar progress-primary w-50%"></div>
      </div>
      <div class="progress-2xl progress-container">
        <div class="progress-bar progress-primary w-60%"></div>
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
