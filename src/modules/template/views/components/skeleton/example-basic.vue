<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-basic'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Placeholder Preview</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>
        Display a placeholder preview of your content before the data gets loaded to reduce
        load-time frustration.
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col border border-slate-100 dark:border-slate-700">
        <div class="flex px-5 py-4 space-x-5">
          <div
            class="skeleton animate-wave h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700"
          ></div>
          <div class="flex flex-1 flex-col justify-between py-2">
            <div
              class="skeleton animate-wave h-3 w-full rounded bg-slate-100 dark:bg-slate-700"
            ></div>
            <div
              class="skeleton animate-wave h-3 w-full rounded bg-slate-100 dark:bg-slate-700"
            ></div>
          </div>
        </div>
        <div class="skeleton animate-wave h-48 w-full bg-slate-100 dark:bg-slate-700"></div>
        <div class="w-full px-6 py-4">
          <div
            class="skeleton animate-wave h-3 w-full rounded bg-slate-100 dark:bg-slate-700"
          ></div>
          <div
            class="skeleton animate-wave mt-4 h-3 w-8/12 rounded bg-slate-100 dark:bg-slate-700"
          ></div>
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
