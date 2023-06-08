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
    <div class="flex gap-4">
      <label class="btn btn-primary">
        <input type="file" class="pointer-events-none absolute opacity-0" />
        <div class="flex items-center space-x-2">
          <i class="i-far-arrow-up-from-bracket block"></i>
          <span>Choose File</span>
        </div>
      </label>
      <label class="btn btn-secondary rounded-full p-3">
        <input tabindex="-1" type="file" class="pointer-events-none absolute opacity-0" />
        <i class="i-far-arrow-up-from-bracket block"></i>
      </label>
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
