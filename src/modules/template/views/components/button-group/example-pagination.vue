<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-pagination'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Pagination</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex flex-col gap-4">
      <div class="btn-group">
        <button type="button" class="btn btn-outline-primary rounded-r-none">
          <i class="i-fas-angle-left block"></i>
        </button>
        <button type="button" class="btn btn-primary rounded-none border-r-none">1</button>
        <button type="button" class="btn btn-outline-primary rounded-none border-r-none">2</button>
        <button type="button" class="btn btn-outline-primary rounded-none border-r-none">3</button>
        <button type="button" class="btn btn-outline-primary rounded-none border-r-none">4</button>
        <button type="button" class="btn btn-outline-primary rounded-none border-r-none">5</button>
        <button type="button" class="btn btn-outline-primary rounded-l-none">
          <i class="i-fas-angle-right block"></i>
        </button>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-outline-success m-1 rounded-full">
          <i class="i-fas-angle-left block"></i>
        </button>
        <button type="button" class="btn btn-success m-1 rounded-full">1</button>
        <button type="button" class="btn btn-outline-success m-1 rounded-full">2</button>
        <button type="button" class="btn btn-outline-success m-1 rounded-full">3</button>
        <button type="button" class="btn btn-outline-success m-1 rounded-full">4</button>
        <button type="button" class="btn btn-outline-success m-1 rounded-full">5</button>
        <button type="button" class="btn btn-outline-success m-1 rounded-full">
          <i class="i-fas-angle-right block"></i>
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
