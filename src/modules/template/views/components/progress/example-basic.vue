<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Basic</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>The Progress component displays a colored loading bar.</p>
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <div class="progress-container">
        <div class="progress-bar progress-primary w-10%"></div>
      </div>
      <div class="progress-container">
        <div class="progress-bar progress-secondary w-20%"></div>
      </div>
      <div class="progress-container">
        <div class="progress-bar progress-info w-30%"></div>
      </div>
      <div class="progress-container">
        <div class="progress-bar progress-success w-40%"></div>
      </div>
      <div class="progress-container">
        <div class="progress-bar progress-warning w-50%"></div>
      </div>
      <div class="progress-container">
        <div class="progress-bar progress-danger w-60%"></div>
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
