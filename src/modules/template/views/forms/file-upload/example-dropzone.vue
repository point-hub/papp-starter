<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Drag & Drop</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex gap-4">
      <div class="w-full flex items-center justify-center">
        <label for="dropzone-file" class="dropzone">
          <div class="flex flex-col items-center justify-center py-6">
            <i class="i-far-cloud-arrow-up mb-2 block h-10 w-10 bg-slate-400 dark:bg-slate-500"></i>
            <p class="mb-2 text-sm text-slate-500 dark:text-slate-400">
              <span class="font-semibold">Click to upload</span>
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400">PNG, JPG or MP4</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
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
