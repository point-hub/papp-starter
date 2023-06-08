<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Label</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>The Progress component displays a label.</p>
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <div class="progress-container progress-lg">
        <div class="progress-primary progress-bar w-30%">
          <p>Size LG</p>
        </div>
      </div>
      <div class="progress-lg progress-container">
        <div class="progress-bar progress-secondary w-40%">
          <p>Size LG</p>
          <p>40%</p>
        </div>
      </div>
      <div class="progress-container progress-xl">
        <div class="progress-bar progress-info w-50%">
          <p>Size XL</p>
        </div>
      </div>
      <div class="progress-xl progress-container">
        <div class="progress-bar progress-success w-60%">
          <p>Size XL</p>
          <p>60%</p>
        </div>
      </div>
      <div class="progress-container progress-2xl">
        <div class="progress-bar progress-warning w-70%">
          <p>Size 2XL</p>
        </div>
      </div>
      <div class="progress-2xl progress-container">
        <div class="progress-bar progress-danger w-80%">
          <p>Size 2XL</p>
          <p>60%</p>
        </div>
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
