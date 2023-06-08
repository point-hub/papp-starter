<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-horizontal'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Horizontal</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-col gap-4">
      <div class="btn-group">
        <button type="button" class="btn btn-primary rounded-r-none border-r-none">Left</button>
        <button type="button" class="btn btn-outline-primary rounded-none border-r-none">
          Middle
        </button>
        <button type="button" class="btn btn-outline-primary rounded-l-none">Right</button>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-secondary rounded-l-full rounded-r-none border-r-none">
          Left
        </button>
        <button type="button" class="btn btn-outline-secondary rounded-none border-r-none">
          Middle
        </button>
        <button type="button" class="btn btn-outline-secondary rounded-l-none rounded-r-full">
          Right
        </button>
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
