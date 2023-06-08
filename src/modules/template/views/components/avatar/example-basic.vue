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
        The Avatar component creates a scalable, colorable element that can have text, icon or image
        within its shape.
      </p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <div class="avatar avatar-2xl">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-xl">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-lg">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-base">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-sm">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
      </div>
      <div class="avatar avatar-xs">
        <img class="rounded-full" src="https://via.placeholder.com/150" />
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
