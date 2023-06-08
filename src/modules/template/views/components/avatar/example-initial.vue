<script setup lang="ts">
import { ref } from 'vue'
import { BaseSwitch } from '@/components/index'
import { codeExample } from './example-initial'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Initial</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>
        In the absence of a image, you can use the initial. Initials can be used in various
        variants.
      </p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <div class="avatar avatar-2xl">
        <span class="avatar-initial rounded-full bg-primary text-white">JD</span>
      </div>
      <div class="avatar avatar-xl">
        <span class="avatar-initial rounded-full bg-secondary text-white">JD</span>
      </div>
      <div class="avatar avatar-lg">
        <span class="avatar-initial rounded-full bg-info text-white">JD</span>
      </div>
      <div class="avatar avatar-base">
        <span class="avatar-initial rounded-full bg-success text-white">JD</span>
      </div>
      <div class="avatar avatar-sm">
        <span class="avatar-initial rounded-full bg-warning text-white">JD</span>
      </div>
      <div class="avatar avatar-xs">
        <span class="avatar-initial rounded-full bg-danger text-white">JD</span>
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
