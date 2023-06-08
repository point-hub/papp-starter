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
      <p>
        A Spinner component is used to show the user a timely process is currently taking place.
      </p>
    </div>
    <div class="flex gap-4">
      <span class="spinner spinner-primary" />
      <span class="spinner spinner-secondary" />
      <span class="spinner spinner-info" />
      <span class="spinner spinner-success" />
      <span class="spinner spinner-warning" />
      <span class="spinner spinner-danger" />
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
